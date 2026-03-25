import { createFormMessage } from '../components/formMessage';
import { createPosts } from '../components/posts';
import { createFeeds } from '../components/feeds';
import { t } from '../i18n';
import { addFeed, addLink, addPosts } from '../state';
import { parse } from '../helper/parser';

const baseFetch = (url) => {
  return fetch(
    `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`,
  ).then((response) => {
    if (response.ok) return response.json();
    throw new Error('errors.network');
  });
};

export const makeFetch = (url) => {
  return baseFetch(url)
    .then((data) => {
      if (!data.status.content_type.includes('application/rss+xml')) {
        throw new Error('errors.invalidRss');
      }

      const { feed, posts } = parse(data.contents);
      addFeed(feed);
      addPosts(posts);
      addLink(url);

      createFormMessage(t('success.rssLoaded'), 'success');
      createPosts();
      createFeeds();
    })
    .catch((error) => {
      createFormMessage(t(error.message), 'error');
      throw error;
    });
};

export const updateFetch = (url) => {
  baseFetch(url).then((data) => {
    const { posts } = parse(data.contents);
    addPosts(posts);
    createPosts();
  });
};
