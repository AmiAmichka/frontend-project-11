import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { autoUpdate } from './src/helper/autoUpdater.js';
import { makeFetch } from './src/helper/fetch.js';
import { urlSchema } from './src/helper/validator.js';
import { t } from './src/i18n.js';
import { getState } from './src/state.js';
import { initView } from './src/view.js';

const state = getState();
const watchedState = initView(state);
const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  watchedState.form.error = '';
  watchedState.form.isValid = true;
  watchedState.process.info = '';
  watchedState.process.status = 'filling';

  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());

  urlSchema
    .validate(formObject)
    .then((formData) => {
      if (watchedState.data.links.includes(formData.url)) {
        throw new Error('errors.alreadyExists');
      }
      watchedState.process.status = 'loading';

      return makeFetch(watchedState, formData.url).then(() => {
        watchedState.process.info = t('success.rssLoaded');
        watchedState.process.status = 'success';
      });
    })
    .catch((error) => {
      watchedState.form.error = t(error.message);
      watchedState.form.isValid = false;
      watchedState.process.status = 'error';
    });
});

autoUpdate(watchedState);
