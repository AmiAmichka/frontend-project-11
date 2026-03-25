import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { autoUpdate } from './src/helper/autoUpdater.js';
import { makeFetch } from './src/helper/fetch.js';
import { urlSchema } from './src/helper/validator.js';
import { initI18n, t } from './src/i18n.js';
import { getState } from './src/state.js';
import { initView } from './src/view.js';

const applyDefaultTranslations = () => {

  document.title = t('ui.pageTitle');

  document.querySelector('#pageTitle').textContent = t('ui.pageTitle');
  document.querySelector('#pageDescription').textContent = t('ui.pageDescription');
  document.querySelector('#url').setAttribute('placeholder', t('ui.rssPlaceholder'));
  document.querySelector('#urlLabel').textContent = t('ui.rssPlaceholder');
  document.querySelector('#submitButton').textContent = t('ui.addButton');
  document.querySelector('#exampleText').textContent = t('ui.example');
  document.querySelector('#postsTitle').textContent = t('ui.posts');
  document.querySelector('#feedsTitle').textContent = t('ui.feeds');
  document.querySelector('#postModalLink').textContent = t('ui.readFull');
  document.querySelector('#modalCloseButton').textContent = t('ui.close');

};

const runApp = () => {
  const state = getState();
  const watchedState = initView(state);
  const form = document.querySelector('.form');

  applyDefaultTranslations();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    watchedState.form.error = '';
    watchedState.form.isValid = true;
    watchedState.process.info = '';
    watchedState.process.status = 'filling';

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
};

initI18n().then(runApp);
