function searchNote(){
 let q=document.getElementById("searchInput").value.toLowerCase();
 for(let c in notes){
  for(let n of notes[c]){
   if(n.toLowerCase().includes(q)){
    document.getElementById("note").innerText=n;
    return;
   }
  }
 }
}
