const cards = document.querySelectorAll('.card');
const cardContainer = document.querySelector('.container');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('show', entry.isIntersecting);
  });
}, {
  // rootMargin: '100px',
  threshold: 1,
});

const lastCardObserver = new IntersectionObserver(entries => {
  const lastCard = entries[0];
  if (lastCard.isIntersecting) {
    // load new cards (lazy lading)
    loadNewCards();

    // observe new last card
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector('.card:last-child'));
  }
}, {})

cards.forEach(card => {
  observer.observe(card);
});

lastCardObserver.observe(document.querySelector('.card:last-child'));

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement('div');
    card.textContent = 'New card';
    card.classList.add('card');
    observer.observe(card);
    cardContainer.append(card);
  }
}
