const form = document.querySelector('.form');

export const removeFormMessage = () => {
  const messageEl = document.querySelector('#message');

  if (messageEl) {
    messageEl.remove();
  }
};

export const createFormMessage = (validatorResult, type = 'success') => {
  removeFormMessage();
  const message = document.createElement('p');
  const messageClass = type === 'error' ? 'text-danger' : 'text-success';

  message.classList.add(messageClass, 'mb-1', 'small');
  message.setAttribute('id', 'message');
  message.textContent = validatorResult;

  form.append(message);
};
