import { createPosts } from "./src/components/posts.js";
import { parse } from "./src/helper/parser.js";
import { getState, setFeeds, setPosts } from "./src/state.js";

const form = document.querySelector('.form');

//validor функция обработчик - обработать что юзер пишет в инпут
form.addEventListener('submit', (event) => {
  console.log('kjk')
  event.preventDefault();

  //одельными функциями делать эти обработчики а потом тут вызывать
  //если url уже есть
  // если форма пустая
  //если url некорректный

  //если провалидировали урл то делаем запрос

  fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent('https://lorem-rss.hexlet.app/feed')}`)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
    })
    .then(data => {
      const { feed, posts } = parse(data.contents)
      setFeeds(feed)
      setPosts(posts);

      createPosts();
    });
})