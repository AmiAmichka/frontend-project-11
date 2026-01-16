import { getPosts } from "../state.js"

// создаю посты через createElement, className/ setAttribute

const createPost = (post) => {
  const container = document.createElement('div');
  const link = document.createElement('a');
  const button = document.createElement('button');

  container.append(link);
  container.append(button);

  link.textContent = post.title;
  link.setAttribute('href', post.link);
  button.textContent = 'Просмотр'

  container.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'gap-2')
  link.classList.add('fw-bold')
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm')

  return container
}

export const createPosts = () => {
  const postsContainer = document.querySelector('#postsContainer');

  postsContainer.innerHTML = '';

  getPosts().forEach((post) => {
    const postElement = createPost(post);
    postsContainer.append(postElement);
  });
}