const form = document.querySelector('.form');

//validor функция обработчик - обработать что юзер пишет в инпут
//parser нужно вынести в хелперы или утилиты (создать папку)
const parse = (data) => {
  const parser = new DOMParser()
  const domData = parser.parseFromString(data, 'application/xml')

  console.log(domData)
  const feed = {
    title: domData.querySelector('title')?.textContent,
    description: domData.querySelector('description')?.textContent
  }
  const posts = []

  domData.querySelectorAll('item').forEach((item) => {
    const post = {
      title: item.querySelector('title')?.textContent,
      description: item.querySelector('description')?.textContent,
      link: item.querySelector('link')?.textContent,
      id: item.querySelector('link')?.textContent  //проверить уникальны ли ссылки, если не уникальны то есть библиотека uuid
    }
    posts.push(post)
  })

  console.log(feed)
  console.log(posts)

  return { feed, posts }
}

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
    .then(data => {console.log(parse(data.contents))});
})