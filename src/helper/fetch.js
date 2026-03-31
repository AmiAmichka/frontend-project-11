import { addFeed, addLink, addPosts } from '../state'
import { parse } from '../helper/parser'

const baseFetch = (url) => {
  return fetch(
    `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`,
  ).then((response) => {
    if (!response.ok) {
      throw new Error('errors.network')
    }

    return response.json()
  }).catch(() => {
    throw new Error('errors.network')
  })
}

export const makeFetch = (state, url) => {
  return baseFetch(url)
    .then((data) => {
      if (!data.contents) {
        throw new Error('errors.invalidRss')
      }

      const { feed, posts } = parse(data.contents)
      addFeed(state, feed)
      addPosts(state, posts)
      addLink(state, url)
    })
}

export const updateFetch = (state, url) => {
  return baseFetch(url).then((data) => {
    const { posts } = parse(data.contents)
    addPosts(state, posts)
  })
}
