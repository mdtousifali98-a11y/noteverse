/* ================= pages/username.js ================= */

const usernameInput = document.getElementById('usernameInput');
const usernameContainer = document.getElementById('usernameContainer');
let usernameStyles = []; // array of style functions or symbol patterns

/* ===== Load Styles / Symbols ===== */
async function loadUsernameStyles(){
  try{
    const fontsRes = await fetch('../assets/data/usernames/fonts.json');
    const fonts = await fontsRes.json(); // array of unicode fonts or mappings

    const symbolsRes = await fetch('../assets/data/usernames/symbols.json');
    const symbols = await symbolsRes.json(); // array of symbol patterns

    usernameStyles = fonts.concat(symbols); // combine all styles
    console.log('Username styles loaded:', usernameStyles.length);
  } catch(e){
    console.error('Failed to load username styles', e);
    usernameStyles = [];
  }
}

/* ===== Generate Styled Usernames ===== */
function generateUsernames(name){
  if(!name || usernameStyles.length===0) return [];
  const result = [];

  usernameStyles.forEach(style=>{
    if(typeof style === 'string'){ // symbol pattern example
      let styled = style.replace(/x/g, name);
      result.push(styled);
    } else if(typeof style === 'function'){ // font function
      result.push(style(name));
    }
  });

  // Limit to first 1000+ to avoid overloading DOM
  return result.slice(0,1000);
}

/* ===== Display Usernames ===== */
function displayUsernames(usernames){
  usernameContainer.innerHTML = '';
  usernames.forEach(username=>{
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <p class="user-text">${username}</p>
      <div class="note-actions">
        <button class="copy-btn">Copy</button>
        <button class="share-btn">Share</button>
      </div>
    `;
    usernameContainer.appendChild(card);

    // Attach copy/share listeners
    card.querySelector('.copy-btn').addEventListener('click', ()=>copyText(card.querySelector('.copy-btn')));
    card.querySelector('.share-btn').addEventListener('click', ()=>shareText(card.querySelector('.share-btn')));
  });
}

/* ===== Search Filter ===== */
const searchInput = document.getElementById('search');
searchInput && searchInput.addEventListener('keyup', e=>{
  const query = e.target.value.toLowerCase();
  document.querySelectorAll('.user-card').forEach(card=>{
    const text = card.querySelector('.user-text').innerText.toLowerCase();
    card.style.display = text.includes(query) ? 'block' : 'none';
  });
});

/* ===== Input Event ===== */
usernameInput && usernameInput.addEventListener('input', e=>{
  const name = e.target.value.trim();
  if(!name) return usernameContainer.innerHTML = '';
  const usernames = generateUsernames(name);
  displayUsernames(usernames);
});

/* ===== Initialize ===== */
document.addEventListener('DOMContentLoaded', loadUsernameStyles);
