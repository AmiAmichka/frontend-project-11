export const setModal = (title, description, link) => {
  const postModal = document.querySelector('#modal');
  const postModalTitle = postModal.querySelector('#postModalTitle');
  const postModalDescription = postModal.querySelector('#postModalDescription');
  const postModalLink = postModal.querySelector('#postModalLink');

  postModalTitle.textContent = title;
  postModalDescription.textContent = description;
  postModalLink.setAttribute('href', link);

}
