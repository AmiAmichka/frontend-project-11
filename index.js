import { createFeeds } from "./src/components/feeds.js";
import { createPosts } from "./src/components/posts.js";
import { parse } from "./src/helper/parser.js";
import { urlSchema } from "./src/helper/validator.js";
import { addFeed, addPosts } from "./src/state.js";

const form = document.querySelector('.form');

//validor функция обработчик - обработать что юзер пишет в инпут
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form)
  const formObject = Object.fromEntries(formData.entries());
    console.log('Form data as object:', formObject);
  
   urlSchema.validate(formObject)
    .then((data) => {
      console.log(data)
      fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(data.url)}`)
        .then(response => {
          if (response.ok) return response.json()
          throw new Error('Network response was not ok.')
        })
        .then(data => {
          const { feed, posts } = parse(data.contents)
          addFeed(feed)
          addPosts(posts);

          createPosts();
          createFeeds();
        });
    })
    .catch((error) => {
      console.log(error.type, error.message)
    });

  //одельными функциями делать эти обработчики а потом тут вызывать
  //если url уже есть
  // если форма пустая
  //если url некорректный

  //если провалидировали урл то делаем запрос
})