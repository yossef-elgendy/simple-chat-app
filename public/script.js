const socket = io('http://localhost:8080')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const username = prompt("Please enter your username.")
appendMessage('You joined.')
socket.emit('new-user', username)

socket.on('chat-message', data =>{
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connection-message', name =>{
    appendMessage(`${name} joined the chat.`)
})

socket.on('user-disconnected', name =>{
    appendMessage(`${name} left the chat.`)
})

messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
    
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}