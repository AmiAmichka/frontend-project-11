const form = document.querySelector('.form');

export const createFormMessage  = (validatorResult) => {
  const messageEl = document.querySelector('#message')
  if (messageEl) {
      messageEl.remove();
  }

  const message = document.createElement('p');

  message.classList.add('text-success', 'mb-1', 'small');
  message.setAttribute('id', 'message');
  message.textContent = validatorResult;

  form.append(message);
};