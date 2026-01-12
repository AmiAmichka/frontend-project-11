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