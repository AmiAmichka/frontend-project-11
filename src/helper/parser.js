export const parse = (data) => {
  const parser = new DOMParser();
  const domData = parser.parseFromString(data, 'application/xml');

  const parserError = domData.querySelector('parsererror');
  const channel = domData.querySelector('channel');

  const feedTitle = channel?.querySelector('title')?.textContent;
  const feedDescription = channel?.querySelector('description')?.textContent;

  if (parserError || !channel || !feedTitle || !feedDescription) {
    throw new Error('errors.invalidRss');
  }

  const feed = {
    title: feedTitle,
    description: feedDescription,
  };

  const posts = Array.from(domData.querySelectorAll('item')).map((item) => {
    const title = item.querySelector('title')?.textContent?.trim();
    const description = item.querySelector('description')?.textContent?.trim() ?? '';
    const link = item.querySelector('link')?.textContent?.trim();

    if (!title || !link) {
      throw new Error('errors.invalidRss');
    }

    return {
      title,
      description,
      link,
      id: link,
    };
  });

  return { feed, posts };
};
