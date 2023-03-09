var chatBox = document.getElementById('chat-box');
var chatButton = document.getElementsByClassName("chat-btn")[0];
var chatCancelBtn = document.getElementById('cancel-btn');

chatButton.addEventListener("click",()=>{
    chatBox.style.display = "block";
})

chatCancelBtn.addEventListener("click",()=>{
    chatBox.style.display = "none"
})