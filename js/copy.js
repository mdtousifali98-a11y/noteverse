/* ================= copy.js ================= */

/* ===== Copy Button Handler ===== */
function copyText(btn){
  const card = btn.closest('.note-card, .bio-card, .user-card, .shayari-card, .quote-card, .emoji');
  if(!card) return;

  const textEl = card.querySelector('.note-text, .bio-text, .user-text, .shayari-text, .quote-text, .emoji-text');
  if(!textEl) return;

  const text = textEl.innerText.trim();

  navigator.clipboard.writeText(text)
    .then(()=>{
      btn.innerText = 'Copied ✓';
      btn.classList.add('copied');
      setTimeout(()=>{
        btn.innerText = 'Copy';
        btn.classList.remove('copied');
      },1200);
    })
    .catch(()=>{
      alert('Copy failed! 😢');
    });
}

/* ===== Share Button Handler ===== */
function shareText(btn){
  const card = btn.closest('.note-card, .bio-card, .user-card, .shayari-card, .quote-card, .emoji');
  if(!card) return;

  const textEl = card.querySelector('.note-text, .bio-text, .user-text, .shayari-text, .quote-text, .emoji-text');
  if(!textEl) return;

  const text = textEl.innerText.trim();

  if(navigator.share){
    navigator.share({text})
      .then(()=>alert('Shared successfully! ✅'))
      .catch(()=>alert('Share cancelled ❌'));
  } else {
    prompt('Copy & Share this text:', text);
  }
}

/* ===== Attach Click Listeners ===== */
document.querySelectorAll('.copy-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>copyText(btn));
});

document.querySelectorAll('.share-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>shareText(btn));
});
