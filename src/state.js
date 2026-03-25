const state = {
  form: {
    error: '',
    isValid: false,
  },
  data: {
    posts: [],
    feeds: [],
    links: [],
  },
  UIstate: {
    modalOpen: false,
    viewedPosts: new Set(), //или []
  },
  process: {
    info: '',
    status: 'loading', // конкретно сейчас такой статус, еще может быть error, filling, success
  },
};

export const getState = () => state;

export const getPosts = () => state.data.posts;

export const addPosts = (posts) => {
  posts.forEach((post) => {
    if (!state.data.posts.find(({ id }) => post.id === id)) {
      state.data.posts.push(post);
    }
  });
};

export const getFeeds = () => state.data.feeds;

export const addFeed = (feed) => {
  state.data.feeds.push(feed);
};

export const addLink = (link) => {
  state.data.links.push(link);
};

export const getLinks = () => state.data.links;

export const getViewedPosts = () => state.UIstate.viewedPosts;

export const addViewedPost = (id) => {
  state.UIstate.viewedPosts.add(id);
}

export const isPostViewed = (postId) => state.UIstate.viewedPosts.has(postId)
