const state = {
  form: {
    error: '',
    isValid: true,
  },
  data: {
    posts: [],
    feeds: [],
    links: [],
  },
  UIstate: {
    modalOpen: false,
    viewedPosts: [],
  },
  process: {
    info: '',
    status: 'filling',
  },
}

export const getState = () => state

export const addPosts = (currentState, posts) => {
  posts.forEach((post) => {
    if (!currentState.data.posts.some(({ id }) => post.id === id)) {
      currentState.data.posts.push(post)
    }
  })
}

export const addFeed = (currentState, feed) => {
  currentState.data.feeds.push(feed)
}

export const addLink = (currentState, link) => {
  currentState.data.links.push(link)
}

export const addViewedPost = (currentState, id) => {
  if (!currentState.UIstate.viewedPosts.includes(id)) {
    currentState.UIstate.viewedPosts.push(id)
  }
}

export const isPostViewed = (currentState, postId) => currentState.UIstate.viewedPosts.includes(postId)
