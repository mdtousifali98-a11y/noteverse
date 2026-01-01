/* ================= pages/notes.js ================= */

/* ===== Load Notes from Data ===== */
// Example JSON structure: assets/data/notes/attitude.json, love.json, etc.

const notesContainer = document.getElementById('notesContainer');
const categories = ['attitude','love','sad','islamic','motivational'];

async function loadNotes(){
  let count = 0;

  for(const cat of categories){
    try{
      const res = await fetch(../assets/data/notes/${cat}.json);
      const data = await res.json(); // array of notes
      data.forEach((note, i)=>{
        const card = document.createElement('div');
        card.className = 'note-card';
        card.dataset.category = cat;
        card.innerHTML = `
          <p class="note-text">${note}</p>
          <div class="note-actions">
            <button class="copy-btn">Copy</button>
            <button class="share-btn">Share</button>
          </div>
        `;
        notesContainer.appendChild(card);
        count++;
      });
    } catch(e){
      console.error(Failed to load ${cat} notes, e);
    }
  }

  console.log(Total Notes Loaded: ${count});

  // Attach copy/share listeners
  document.querySelectorAll('.copy-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>copyText(btn));
  });
  document.querySelectorAll('.share-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>shareText(btn));
  });
}

/* ===== Filter by Category ===== */
function filterNotes(category){
  const cards = document.querySelectorAll('.note-card');
  cards.forEach(card=>{
    card.style.display = (category==='all' || card.dataset.category===category) ? 'block':'none';
  });
}

/* ===== Search Integration ===== */
const searchInput = document.getElementById('search');
searchInput && searchInput.addEventListener('keyup', e=>{
  const query = e.target.value.toLowerCase();
  const activeCatBtn = document.querySelector('.category-bar button.active');
  const filterCat = activeCatBtn ? (activeCatBtn.dataset.category || activeCatBtn.innerText.toLowerCase()) : 'all';

  const cards = document.querySelectorAll('.note-card');
  cards.forEach(card=>{
    const text = card.querySelector('.note-text').innerText.toLowerCase();
    const matchesCategory = (filterCat==='all' || card.dataset.category===filterCat);
    const matchesQuery = text.includes(query);
    card.style.display = (matchesCategory && matchesQuery) ? 'block':'none';
  });
});

/* ===== Initialize ===== */
document.addEventListener('DOMContentLoaded', loadNotes);
