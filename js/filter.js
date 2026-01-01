/* ================= filter.js ================= */

/* Function to filter cards by category */
function filterCards(category){
  // Select all possible cards
  const cards = document.querySelectorAll('.note-card, .bio-card, .user-card, .shayari-card, .quote-card, .emoji');

  cards.forEach(card => {
    const cardCategory = card.dataset.category || 'all';
    if(category === 'all' || cardCategory === category){
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

/* Attach click listeners to category buttons */
document.querySelectorAll('.category-btn, .filter-bar button').forEach(btn => {
  btn.addEventListener('click', ()=>{
    const category = btn.dataset.category || btn.innerText.toLowerCase().trim();
    filterCards(category);

    // Optional: highlight active button
    document.querySelectorAll('.category-btn, .filter-bar button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* Optional: Search + Filter integration */
function searchAndFilter(searchQuery, filterCategory){
  const query = searchQuery.toLowerCase().trim();
  const cards = document.querySelectorAll('.note-card, .bio-card, .user-card, .shayari-card, .quote-card, .emoji');

  cards.forEach(card=>{
    const textEl = card.querySelector('.note-text, .bio-text, .user-text, .emoji-text, .shayari-text, .quote-text');
    const cardCategory = card.dataset.category || 'all';
    const text = textEl ? textEl.innerText.toLowerCase() : '';

    if( (filterCategory === 'all' || cardCategory === filterCategory) &&
        (query === '' || text.includes(query)) ){
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

/* Optional: integrate with search input */
const searchInputs = document.querySelectorAll('.search-input, #search');
searchInputs.forEach(input=>{
  input.addEventListener('keyup', e=>{
    const query = e.target.value;
    const activeBtn = document.querySelector('.category-btn.active, .filter-bar button.active');
    const category = activeBtn ? (activeBtn.dataset.category || activeBtn.innerText.toLowerCase().trim()) : 'all';
    searchAndFilter(query, category);
  });
});
