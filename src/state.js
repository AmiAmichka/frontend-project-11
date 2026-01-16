const state = {
  form: {
    error: '',
    isValid: false
  },
  data: {
    posts: [],
    feeds: []
  },
  UIstate: {
    modalOpen: false,
    viewedPosts: new Set() //или []
  },
  process: {
    info: '',
    status: 'loading' // конкретно сейчас такой статус, еще может быть error, filling, success
  }
}

// c этим стейтом будем работать с on change

export const getState = () => state

export const getPosts = () => state.data.posts;

export const setPosts = (posts) => {
  state.data.posts.push(...posts);
}

export const getFeeds = (feed) => tate.data.feeds;

export const setFeeds = (feed) => {
  state.data.feeds.push(feed)
}