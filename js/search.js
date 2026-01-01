/* ================= search.js ================= */

/* Global Search Input Handler */
document.querySelectorAll('.search-input, #search').forEach(inputEl => {
  inputEl.addEventListener('keyup', (e) => {
    const query = e.target.value.toLowerCase().trim();

    /* Check all cards with .note-card, .bio-card, .user-card, .emoji, .shayari-card, .quote-card */
    const cards = document.querySelectorAll('.note-card, .bio-card, .user-card, .emoji, .shayari-card, .quote-card');

    cards.forEach(card => {
      const textEl = card.querySelector('.note-text, .bio-text, .user-text, .emoji-text, .shayari-text, .quote-text');
      if(!textEl) return;

      const text = textEl.innerText.toLowerCase();
      card.style.display = text.includes(query) ? 'block' : 'none';
    });
  });
});

/* Optional: Enter key trigger copy or share */
document.querySelectorAll('.search-input, #search').forEach(inputEl => {
  inputEl.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
      // Optional: copy first matched card
      const firstCard = document.querySelector('.note-card, .bio-card, .user-card, .emoji, .shayari-card, .quote-card');
      if(firstCard){
        const textEl = firstCard.querySelector('.note-text, .bio-text, .user-text, .emoji-text, .shayari-text, .quote-text');
        textEl && navigator.clipboard.writeText(textEl.innerText);
        alert('First matched content copied!');
      }
    }
  });
});

/* Optional: Highlight matched text */
function highlightMatches(query){
  if(!query) return;
  const cards = document.querySelectorAll('.note-card, .bio-card, .user-card, .emoji, .shayari-card, .quote-card');
  cards.forEach(card=>{
    const textEl = card.querySelector('.note-text, .bio-text, .user-text, .emoji-text, .shayari-text, .quote-text');
    if(!textEl) return;
    const text = textEl.innerText;
    const regex = new RegExp((${query}), 'gi');
    textEl.innerHTML = text.replace(regex, '<mark style="background:#22c55e;color:#000;">$1</mark>');
  });
}

/* Reset highlights when input cleared */
document.querySelectorAll('.search-input, #search').forEach(inputEl=>{
  inputEl.addEventListener('input', (e)=>{
    if(e.target.value.trim()===''){
      const cards = document.querySelectorAll('.note-card, .bio-card, .user-card, .emoji, .shayari-card, .quote-card');
      cards.forEach(card=>{
        const textEl = card.querySelector('.note-text, .bio-text, .user-text, .emoji-text, .shayari-text, .quote-text');
        if(!textEl) return;
        textEl.innerHTML = textEl.innerText; // remove <mark>
      });
    }
  });
});
