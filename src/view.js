import onChange from 'on-change';
import { createFeeds } from './components/feeds.js';
import { createFormMessage, removeFormMessage } from './components/formMessage.js';
import { createPosts } from './components/posts.js';

const form = document.querySelector('.form');
const input = form.querySelector('#url');
const submitButton = form.querySelector('[type="submit"]');

const renderForm = (state) => {
  const isLoading = state.process.status === 'loading';

  input.disabled = isLoading;
  submitButton.disabled = isLoading;

  if (state.process.status === 'success' && state.process.info) {
    input.classList.remove('is-invalid');
    form.reset();
    input.focus();
  }

  if (state.process.status === 'error') {
    input.classList.add('is-invalid');
    input.focus();
  }

  if (state.process.status === 'filling') {
    input.classList.remove('is-invalid');
  }

  if (state.form.error) {
    createFormMessage(state.form.error, 'error');
    return;
  }

  if (state.process.info) {
    createFormMessage(state.process.info, 'success');
    return;
  }

  removeFormMessage();
};

export const initView = (state) => {
  const watchedState = onChange(state, (path) => {
    if (path.startsWith('data.posts') || path.startsWith('UIstate.viewedPosts')) {
      createPosts(watchedState);
    }

    if (path.startsWith('data.feeds')) {
      createFeeds(watchedState);
    }

    if (path.startsWith('form.') || path.startsWith('process.')) {
      renderForm(watchedState);
    }
  });

  return watchedState;
};
