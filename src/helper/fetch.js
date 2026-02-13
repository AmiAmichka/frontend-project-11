import { createFormMessage } from '../components/formMessage';
import { createPosts } from '../components/posts';
import { createFeeds } from '../components/feeds';
import { addFeed, addLink, addPosts } from '../state';
import { parse } from '../helper/parser';

const baseFetch = (url) => {
  return fetch(
    `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`,
  ).then((response) => {
    if (response.ok) return response.json();
    throw new Error('Network response was not ok.');
  });
};

export const makeFetch = (url) => {
  baseFetch(url)
    .then((data) => {
      if (!data.status.content_type.includes('application/rss+xml')) {
        throw new Error('Ресурс не содержит валидный RSS');
      }

      const { feed, posts } = parse(data.contents);
      addFeed(feed);
      addPosts(posts);
      addLink(url);

      createFormMessage('RSS успешно загружен');
      createPosts();
      createFeeds();
    })
    .catch((error) => {
      createFormMessage(error.message);
    });
};

export const updateFetch = (url) => {
  baseFetch(url).then((data) => {
    const { posts } = parse(data.contents);
    addPosts(posts);
    createPosts();
  });
};
