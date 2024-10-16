/**
 * Cats page js file
 */
import { getFavourites, getRandomCats, favorate } from '../lib/cats.js';

const navbarNavEl = document.querySelector('.navbar-nav');
navbarNavEl.addEventListener('show.bs.tab', async function (e) {
  e.stopPropagation();

  const tabPanelSel = e.target.getAttribute('data-bs-target');
  let cats = [];

  switch (tabPanelSel) {
    case '#tab-random-cats':
      cats = await getRandomCats();
      break;
    case '#tab-my-favorates':
      cats = await getFavourites();
      break;
  }

  renderCatsGallery(cats, document.querySelector(tabPanelSel));
});

navbarNavEl.querySelector('button').click();

function renderCatsGallery(cats, container) {
  const cols = container.querySelectorAll('.col');
  // clear old cats
  for (const col of cols) {
    col.innerHTML = '';
  }
  for (let i = 0; i < cats.length; i++) {
    const cat = cats[i];
    const wrapper = document.createElement('div');
    wrapper.classList.add('position-relative', 'mb-4');
    const img = document.createElement('img');
    img.src = cat.image.url;
    img.classList.add('w-100', 'shadow-1-strong', 'rounded');
    wrapper.append(img);
    const heart = document.createElement('button');
    heart.classList.add(
      'bi',
      'bi-suit-heart-fill',
      'position-absolute',
      'bottom-0',
      'end-0',
      'me-2',
      'mb-1',
      'btn-heart',
      'display-6'
    );
    wrapper.append(heart);
    heart.addEventListener('click', function (e) {
      favorateCat(cat.image);
    });
    cols[i % 3].append(wrapper);
  }
}

function favorateCat(cat) {
  favorate(cat.id);
  console.log(cat);
}
