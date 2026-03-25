const form = document.querySelector('.form');

export const createFormMessage = (validatorResult, type = 'success') => {
  const messageEl = document.querySelector('#message');
  if (messageEl) {
    messageEl.remove();
  }

  const message = document.createElement('p');
  const messageClass = type === 'error' ? 'text-danger' : 'text-success';

  message.classList.add(messageClass, 'mb-1', 'small');
  message.setAttribute('id', 'message');
  message.textContent = validatorResult;

  form.append(message);
};
