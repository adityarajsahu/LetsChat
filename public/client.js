const socket = io();

let clientName;
do {
    clientName = prompt('Please enter your name: ');
} while(!clientName)

let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.chat-box');

textArea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter')
    {
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {
    let msg = {
        user: clientName,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing');
    textArea.value = '';
    scrollToBottom();
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

socket.on('message',(msg) => {
    console.log(msg);
    appendMessage(msg, 'incoming');
    scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}