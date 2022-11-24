const socket = io();

// query dom
var nikname = localStorage.getItem("nickname"),
    form = document.getElementById("chatForm"),
    messageInput = document.getElementById("messageInput"),
    chatBox = document.getElementById("chat-box"),
    feedBack = document.getElementById("feedback"),
    chatContainer = document.getElementById("chat-container"),
    onlineUsers = document.getElementById("online-users-list");

socket.emit("login", nikname);
// emit events
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (messageInput.value) {
        socket.emit("chat-message", {
            message: messageInput.value,
            name: nikname,
        });
        messageInput.value = "";
    }
});
messageInput.addEventListener("keypress", (e) => {
    let val = e.target.value;
    if (val) {
        socket.emit("typing", {
            name: nikname,
        });
    }
});

socket.on("chat-message", (data) => {
    feedBack.innerHTML = "";
    chatBox.innerHTML += `
    <li class="alert alert-light">
        <span class="text-dark font-weight-normal"
        style="font-size: 13pt">${data.name}</span>
    <span
        class="text-muted
        font-italic font-weight-light m-2"
        style="font-size: 9pt">ساعت 12:00</span>
    <p class="alert alert-info mt-2"  style="font-family: persian01">
        ${data.message}
    </p>
    </li>`;
    chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight;
});
socket.on("typing", (data) => {
    feedBack.innerHTML = `<p class="alert alert-warning w-25"><em>${data.name} is typing</em></p>`;
});

socket.on("online", (data) => {
    onlineUsers.innerHTML = "";
    Object.values(data).forEach((i) => {
        onlineUsers.innerHTML += `<li class="alert alert-light p-1 mx-2">${i} <span class="badge badge-success">آنلاین</span></li>`;
    });
});
