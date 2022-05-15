const socket = io();

tinymce.init({
    selector: 'textarea#textarea',
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
      'emoticons'
    ],

    toolbar: 'bold italic strikethrough | link | bullist numlist | blockquote code codeblock | emoticons',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

let clientName;
do {
    clientName = prompt('Please enter your name: ');
} while(!clientName)

let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.chat-box');
let btn = document.getElementById('send-btn');

function showtext() {
    sendMessage(tinymce.activeEditor.getContent({format: 'html'}));
}


function sendMessage(message) {
    let msg = {
        user: clientName,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing');
    tinymce.activeEditor.setContent('', {format: 'html'});
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