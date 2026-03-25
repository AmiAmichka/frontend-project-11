import { addViewedPost, getPosts, isPostViewed } from "../state.js"
import { t } from "../i18n.js";
import { setModal } from "./modal.js";

// создаю посты через createElement, className/ setAttribute

const createPost = (post) => {
  const container = document.createElement('div');
  const link = document.createElement('a');
  const button = document.createElement('button');

  container.append(link);
  container.append(button);

  link.textContent = post.title;
  link.setAttribute('href', post.link);
  link.setAttribute('target', '_blank');
  button.textContent = t('ui.preview');

  container.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'gap-2')
  if (isPostViewed(post.id)) {
    link.classList.add('fw-normal', 'link-secondary') 
  } else {
    link.classList.add('fw-bold')
  }
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm')

  button.dataset.bsToggle = 'modal';
  button.dataset.bsTarget = '#postModal';

  button.addEventListener('click', () => {
    setModal(post.title, post.description, post.link);
    addViewedPost(post.id);
    createPosts()
  })

  link.addEventListener('click', () => {
    addViewedPost(post.id);
    createPosts()
  })

  return container;
}

export const createPosts = () => {
  const postsContainer = document.querySelector('#postsContainer');

  postsContainer.innerHTML = '';

  getPosts().forEach((post) => {
    const postElement = createPost(post);
    postsContainer.append(postElement);
  });
}