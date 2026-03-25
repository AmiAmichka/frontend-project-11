import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { createFormMessage } from './src/components/formMessage.js';
import { autoUpdate } from './src/helper/autoUpdater.js';
import { makeFetch } from './src/helper/fetch.js';
import { urlSchema } from './src/helper/validator.js';
import { t } from './src/i18n.js';
import { getLinks } from './src/state.js';

const form = document.querySelector('.form');
const input = form.querySelector('#url');
const submitButton = form.querySelector('[type="submit"]');

const setFormDisabled = (disabled) => {
  input.disabled = disabled;
  submitButton.disabled = disabled;
};

const showFormError = (message) => {
  input.classList.add('is-invalid');
  createFormMessage(message, 'error');
};

const resetFormState = () => {
  input.classList.remove('is-invalid');
  form.reset();
  input.focus();
};

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
      setFormDisabled(true);

      makeFetch(formData.url).then(() => {
        resetFormState();
      });
    })
    .catch((error) => {
      showFormError(t(error.message));
    })
    .finally(() => {
      setFormDisabled(false);
    });
});

autoUpdate();
