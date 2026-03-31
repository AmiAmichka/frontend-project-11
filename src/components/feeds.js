const createFeed = (feed) => {
  const container = document.createElement('div')
  const title = document.createElement('h3')
  const description = document.createElement('p')

  container.append(title)
  container.append(description)

  title.textContent = feed.title
  description.textContent = feed.description

  container.classList.add('d-flex', 'flex-column', 'gap-1')
  title.classList.add('fw-medium', 'm-0', 'h6')
  description.classList.add('fw-normal', 'small', 'text-secondary', 'lh-1', 'mb-0')

  return container
}

export const createFeeds = (state) => {
  const feedsContainer = document.querySelector('#feedsContainer')

  feedsContainer.innerHTML = ''

  state.data.feeds.forEach((feed) => {
    const feedElement = createFeed(feed)
    feedsContainer.append(feedElement)
  })
}
