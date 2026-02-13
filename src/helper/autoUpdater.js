import { getLinks } from '../state';
import { updateFetch } from './fetch';

export const autoUpdate = () => {
  const links = getLinks();

  links.forEach((link) => {
    updateFetch(link);
  });

  setTimeout(autoUpdate, 5000);
};
