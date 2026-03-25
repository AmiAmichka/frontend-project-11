import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { createFormMessage } from './src/components/formMessage.js';
import { autoUpdate } from './src/helper/autoUpdater.js';
import { makeFetch } from './src/helper/fetch.js';
import { urlSchema } from './src/helper/validator.js';
import { t } from './src/i18n.js';
import { getLinks } from './src/state.js';

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());

  urlSchema
    .validate(formObject)
    .then((formData) => {
      if (getLinks().includes(formData.url)) {
        throw new Error('errors.alreadyExists');
      }
      makeFetch(formData.url);
    })
    .catch((error) => {
      createFormMessage(t(error.message), 'error');
    });
});

autoUpdate();
