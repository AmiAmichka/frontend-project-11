import { addViewedPost, isPostViewed } from "../state.js"
import { t } from "../i18n.js";
import { setModal } from "./modal.js";

// создаю посты через createElement, className/ setAttribute

const createPost = (state, post) => {
  const container = document.createElement('li');
  const link = document.createElement('a');
  const button = document.createElement('button');

  container.append(link);
  container.append(button);

  link.textContent = post.title;
  link.setAttribute('href', post.link);
  link.setAttribute('target', '_blank');
  button.textContent = t('ui.preview');

  container.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'gap-2')
  if (isPostViewed(state, post.id)) {
    link.classList.add('fw-normal', 'link-secondary') 
  } else {
    link.classList.add('fw-bold')
  }
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm')

  button.dataset.bsToggle = 'modal';
  button.dataset.bsTarget = '#postModal';

  button.addEventListener('click', () => {
    setModal(post.title, post.description, post.link);
    addViewedPost(state, post.id);
  });

  link.addEventListener('click', () => {
    addViewedPost(state, post.id);
  });

  return container;
};

export const createPosts = (state) => {
  const postsContainer = document.querySelector('#postsContainer');

  postsContainer.innerHTML = '';

  state.data.posts.forEach((post) => {
    const postElement = createPost(state, post);
    postsContainer.append(postElement);
  });
};
