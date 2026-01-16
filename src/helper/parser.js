//сюда взять парсер из индекс js
export const parse = (data) => {
  const parser = new DOMParser()
  const domData = parser.parseFromString(data, 'application/xml')

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

  return { feed, posts }
}