/* ================= pages/bio.js ================= */

const bioContainer = document.getElementById('bioContainer');
const bioCategories = ['attitude','love','muslim','sad','english'];
let allBios = {}; // store loaded bios
let currentCategory = 'all';

/* ===== Load All Bios ===== */
async function loadBios(){
  for(const cat of bioCategories){
    try{
      const res = await fetch(../assets/data/bios/${cat}.json);
      const data = await res.json(); // array of bios
      allBios[cat] = data;
    } catch(e){
      console.error(Failed to load ${cat} bios, e);
      allBios[cat] = [];
    }
  }
  displayBios('all');
}

/* ===== Display Bios ===== */
function displayBios(category){
  bioContainer.innerHTML = '';
  let biosToDisplay = [];

  if(category === 'all'){
    bioCategories.forEach(cat=>{
      if(allBios[cat]) biosToDisplay = biosToDisplay.concat(allBios[cat]);
    });
  } else {
    biosToDisplay = allBios[category] || [];
  }

  biosToDisplay.forEach((bio, i)=>{
    const card = document.createElement('div');
    card.className = 'bio-card';
    card.dataset.category = category==='all'?bioCategoryFromText(bio):category;
    card.innerHTML = `
      <p class="bio-text">${bio}</p>
      <div class="note-actions">
        <button class="copy-btn">Copy</button>
        <button class="share-btn">Share</button>
      </div>
    `;
    bioContainer.appendChild(card);
  });

  // Attach copy/share listeners
  document.querySelectorAll('.copy-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>copyText(btn));
  });
  document.querySelectorAll('.share-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>shareText(btn));
  });
}

/* ===== Helper to find category from bio text ===== */
function bioCategoryFromText(bio){
  for(const cat of bioCategories){
    if(allBios[cat] && allBios[cat].includes(bio)) return cat;
  }
  return 'all';
}

/* ===== Filter by Category ===== */
document.querySelectorAll('.category-bar button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    currentCategory = btn.dataset.category || btn.innerText.toLowerCase().trim();
    displayBios(currentCategory);

    // highlight active button
    document.querySelectorAll('.category-bar button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ===== Search Functionality ===== */
const searchInput = document.getElementById('search');
searchInput && searchInput.addEventListener('keyup', e=>{
  const query = e.target.value.toLowerCase().trim();
  document.querySelectorAll('.bio-card').forEach(card=>{
    const text = card.querySelector('.bio-text').innerText.toLowerCase();
    card.style.display = text.includes(query) ? 'block' : 'none';
  });
});

/* ===== Random Bio Generator ===== */
const randomBtn = document.getElementById('randomBioBtn');
randomBtn && randomBtn.addEventListener('click', ()=>{
  const category = currentCategory==='all' ? bioCategories[Math.floor(Math.random()*bioCategories.length)] : currentCategory;
  const bios = allBios[category] || [];
  if(bios.length===0) return;

  const randomBio = bios[Math.floor(Math.random()*bios.length)];
  const card = document.createElement('div');
  card.className = 'bio-card';
  card.dataset.category = category;
  card.innerHTML = `
    <p class="bio-text">${randomBio}</p>
    <div class="note-actions">
      <button class="copy-btn">Copy</button>
      <button class="share-btn">Share</button>
    </div>
  `;
  bioContainer.prepend(card); // show at top

  // attach copy/share to new card
  card.querySelector('.copy-btn').addEventListener('click', ()=>copyText(card.querySelector('.copy-btn')));
  card.querySelector('.share-btn').addEventListener('click', ()=>shareText(card.querySelector('.share-btn')));
});

/* ===== Initialize Page ===== */
document.addEventListener('DOMContentLoaded', loadBios);
