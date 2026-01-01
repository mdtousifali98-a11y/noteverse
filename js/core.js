/* ================= Core.js ================= */

/* ===== Dark Mode Toggle ===== */
const darkToggle = document.getElementById('darkToggle');
darkToggle && darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Load dark mode preference
if(localStorage.getItem('darkMode') === 'true'){
  document.body.classList.add('dark-mode');
}

/* ===== Toast Notification ===== */
function showToast(msg){
  let toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = msg;
  document.body.appendChild(toast);
  toast.style.display = 'block';
  setTimeout(()=>{
    toast.style.opacity = '0';
    setTimeout(()=>toast.remove(),500);
  },1500);
}

/* ===== Copy Text Function ===== */
function copyText(el){
  const text = el.closest('.card, .note-card, .bio-card, .user-card, .emoji').querySelector('.note-text, .bio-text, .user-text, .emoji-text').innerText;
  navigator.clipboard.writeText(text)
  .then(()=>showToast('Copied ✓'))
  .catch(()=>showToast('Copy Failed ❌'));
}

/* ===== Share Text Function ===== */
function shareText(el){
  const text = el.closest('.card, .note-card, .bio-card, .user-card, .emoji').querySelector('.note-text, .bio-text, .user-text, .emoji-text').innerText;
  if(navigator.share){
    navigator.share({text})
      .then(()=>showToast('Shared successfully'))
      .catch(()=>showToast('Share cancelled'));
  } else {
    showToast('Sharing not supported 😢');
  }
}

/* ===== Navbar Scroll Behavior ===== */
const navbar = document.querySelector('nav');
let lastScroll = 0;
window.addEventListener('scroll', ()=>{
  const currentScroll = window.pageYOffset;
  if(currentScroll > lastScroll){
    navbar && (navbar.style.top='-80px'); // hide
  } else {
    navbar && (navbar.style.top='0'); // show
  }
  lastScroll = currentScroll;
});

/* ===== Smooth Scroll for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

/* ===== Global Site Share Button (Optional) ===== */
const shareBtn = document.getElementById('shareBtn');
shareBtn && shareBtn.addEventListener('click', ()=>{
  const url = window.location.href;
  if(navigator.share){
    navigator.share({title: document.title, url})
      .then(()=>showToast('Website Shared'))
      .catch(()=>showToast('Share cancelled'));
  } else {
    prompt('Copy this link:', url);
  }
});

/* ===== Initialize tooltips / future features placeholder ===== */
function initComponents(){
  // For future components like tooltips, modals
}
document.addEventListener('DOMContentLoaded', initComponents);
