let currentCategory="attitude";

function showCategory(cat){
 currentCategory=cat;
 newNote();
}

function newNote(){
 let arr=notes[currentCategory];
 document.getElementById("note").innerText=
 arr[Math.floor(Math.random()*arr.length)];
}

function copyNote(){
 navigator.clipboard.writeText(document.getElementById("note").innerText);
 alert("Copied!");
}

function shareNote(){
 let text=document.getElementById("note").innerText;
 window.open("https://wa.me/?text="+encodeURIComponent(text));
}
