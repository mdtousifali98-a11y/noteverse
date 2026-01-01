// LOGIN SYSTEM
function register(){
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;
  if(u=="" || p==""){
    msg("Fill all fields");
    return;
  }
  localStorage.setItem(u,p);
  msg("Registered ✔ Now login");
}

function login(){
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;
  if(localStorage.getItem(u)==p){
    localStorage.setItem("login","yes");
    window.location="home.html";
  }else{
    msg("Wrong login ❌");
  }
}

function msg(t){
  document.getElementById("msg").innerText=t;
}

function checkLogin(){
  if(localStorage.getItem("login")!="yes"){
    window.location="index.html";
  }
}

function logout(){
  localStorage.removeItem("login");
  window.location="index.html";
}

// NOTES SYSTEM
const notes=[
"🌙 সব চুপ থাকলেও, মন কথা বলে",
"😎 নীরবতাই আমার attitude",
"🖤 সবাই বদলায়, স্মৃতি থাকে",
"✨ নিজেকে খুঁজছি",
"🕌 আল্লাহ ভরসা",
"🔥 নিজের মতো থাকাই luxury"
];

function newNote(){
  document.getElementById("note").innerText=
  notes[Math.floor(Math.random()*notes.length)];
}

function copyNote(){
  navigator.clipboard.writeText(
    document.getElementById("note").innerText
  );
  alert("Copied ✔");
}

setInterval(newNote,5000);
