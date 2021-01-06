// Use to create chat bubble when user submits text
// Appends to display
function createChatBubble(input, style, chatboxMsgDisplay) {
    var chatSection = document.createElement("p");
    chatSection.textContent = input;
    chatSection.classList.add(style);

    chatboxMsgDisplay.appendChild(chatSection);
}

function sendChatmessage(chatboxMsgDisplay, ws, chatboxForm, e) {
    const chatInput = document.querySelector(".js-chatbox-input").value;

    createChatBubble(chatInput, 'your_chatbox__display_chat', chatboxMsgDisplay);
    ws.send(JSON.stringify({ command: constants.CHAT, message: chatInput }));

    e.preventDefault();
    chatboxForm.reset();
}

function toggleChatbox(chatbox, toggleChatboxBtn) {
    chatbox.classList.toggle("chatbox--is-visible");

    if (chatbox.classList.contains("chatbox--is-visible")) {
        toggleChatboxBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    } else {
        toggleChatboxBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    }
}

function openChatBox(chatbox, toggleChatboxBtn) {
    if (!$(chatbox).hasClass('chatbox--is-visible')) {
        toggleChatbox(chatbox, toggleChatboxBtn);
    }
}