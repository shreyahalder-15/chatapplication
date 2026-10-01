// ======================================
// SAMPLE CONVERSATIONS
// ======================================

const conversations = [
    {
        id: 1,
        name: "Rahul",
        avatar: "R",
        status: "Online",
        lastMessage: "How are you?",
        time: "10:30",
        messages: [
            {
                sender: "Rahul",
                text: "Hello!",
                time: "10:28",
                type: "received"
            },
            {
                sender: "You",
                text: "Hi Rahul!",
                time: "10:29",
                type: "sent"
            },
            {
                sender: "Rahul",
                text: "How are you?",
                time: "10:30",
                type: "received"
            }
        ]
    },

    {
        id: 2,
        name: "Anu",
        avatar: "A",
        status: "Offline",
        lastMessage: "See you tomorrow!",
        time: "09:15",
        messages: [
            {
                sender: "Anu",
                text: "Are you coming tomorrow?",
                time: "09:10",
                type: "received"
            },
            {
                sender: "You",
                text: "Yes, definitely!",
                time: "09:12",
                type: "sent"
            },
            {
                sender: "Anu",
                text: "See you tomorrow!",
                time: "09:15",
                type: "received"
            }
        ]
    },

    {
        id: 3,
        name: "Kiran",
        avatar: "K",
        status: "Online",
        lastMessage: "Okay 👍",
        time: "Yesterday",
        messages: [
            {
                sender: "You",
                text: "Did you finish the project?",
                time: "Yesterday",
                type: "sent"
            },
            {
                sender: "Kiran",
                text: "Okay 👍",
                time: "Yesterday",
                type: "received"
            }
        ]
    }
];


// ======================================
// CURRENT CONVERSATION
// ======================================

let currentConversation = conversations[0];


// ======================================
// GET HTML ELEMENTS
// ======================================

const conversationList =
    document.getElementById("conversationList");

const messagesContainer =
    document.getElementById("messagesContainer");

const messageInput =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");

const chatUserName =
    document.getElementById("chatUserName");

const chatAvatar =
    document.getElementById("chatAvatar");

const chatStatus =
    document.getElementById("chatStatus");

const searchInput =
    document.getElementById("searchInput");

const themeBtn =
    document.getElementById("themeBtn");

const emojiBtn =
    document.getElementById("emojiBtn");

const emojiPicker =
    document.getElementById("emojiPicker");

const typingIndicator =
    document.getElementById("typingIndicator");


// ======================================
// DISPLAY CONVERSATIONS
// ======================================

function displayConversations(list = conversations) {

    conversationList.innerHTML = "";

    list.forEach(conversation => {

        const conversationElement =
            document.createElement("div");

        conversationElement.classList.add("conversation");

        if (conversation.id === currentConversation.id) {
            conversationElement.classList.add("active");
        }

        conversationElement.innerHTML = `
            <div class="avatar">
                ${conversation.avatar}
            </div>

            <div class="conversation-details">

                <h3>
                    ${conversation.name}
                </h3>

                <p>
                    ${conversation.lastMessage}
                </p>

            </div>

            <span class="conversation-time">
                ${conversation.time}
            </span>
        `;

        conversationElement.addEventListener(
            "click",
            () => {

                openConversation(conversation.id);

            }
        );

        conversationList.appendChild(
            conversationElement
        );
    });
}


// ======================================
// OPEN CONVERSATION
// ======================================

function openConversation(id) {

    currentConversation =
        conversations.find(
            conversation =>
                conversation.id === id
        );

    chatUserName.textContent =
        currentConversation.name;

    chatAvatar.textContent =
        currentConversation.avatar;

    chatStatus.textContent =
        currentConversation.status;

    displayMessages();

    displayConversations();

}


// ======================================
// DISPLAY MESSAGES
// ======================================

function displayMessages() {

    messagesContainer.innerHTML = "";

    currentConversation.messages.forEach(message => {

        const messageElement =
            document.createElement("div");

        messageElement.classList.add(
            "message",
            message.type
        );

        messageElement.innerHTML = `
            <p class="message-text">
                ${message.text}
            </p>

            <span class="message-time">
                ${message.time}
            </span>
        `;

        messagesContainer.appendChild(
            messageElement
        );
    });

    scrollToBottom();
}


// ======================================
// SEND MESSAGE
// ======================================

function sendMessage() {

    const text =
        messageInput.value.trim();

    if (text === "") {
        return;
    }

    const now =
        new Date();

    const time =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    const newMessage = {

        sender: "You",

        text: text,

        time: time,

        type: "sent"

    };

    currentConversation.messages.push(
        newMessage
    );

    currentConversation.lastMessage =
        text;

    currentConversation.time =
        time;

    messageInput.value = "";

    displayMessages();

    displayConversations();

    simulateReply();

}


// ======================================
// SEND BUTTON
// ======================================

sendBtn.addEventListener(
    "click",
    sendMessage
);


// ======================================
// ENTER KEY
// ======================================

messageInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);


// ======================================
// SEARCH CONVERSATIONS
// ======================================

searchInput.addEventListener(
    "input",
    function() {

        const searchText =
            searchInput.value.toLowerCase();

        const filtered =
            conversations.filter(
                conversation =>
                    conversation.name
                        .toLowerCase()
                        .includes(searchText)
            );

        displayConversations(filtered);

    }
);


// ======================================
// EMOJI PICKER
// ======================================

emojiBtn.addEventListener(
    "click",
    function() {

        emojiPicker.classList.toggle(
            "hidden"
        );

    }
);


const emojiButtons =
    emojiPicker.querySelectorAll("button");


emojiButtons.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            messageInput.value +=
                button.textContent;

            messageInput.focus();

        }
    );

});


// ======================================
// DARK MODE
// ======================================

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );

        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            themeBtn.textContent = "☀️";

        } else {

            themeBtn.textContent = "🌙";

        }

    }
);


// ======================================
// TYPING INDICATOR
// ======================================

messageInput.addEventListener(
    "input",
    function() {

        if (messageInput.value.length > 0) {

            typingIndicator.classList.remove(
                "hidden"
            );

        } else {

            typingIndicator.classList.add(
                "hidden"
            );

        }

    }
);


// ======================================
// SIMULATE REPLY
// ======================================

function simulateReply() {

    typingIndicator.classList.remove(
        "hidden"
    );

    setTimeout(function() {

        typingIndicator.classList.add(
            "hidden"
        );

        const reply = {

            sender: currentConversation.name,

            text: "Nice! 😊",

            time: new Date()
                .toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                }),

            type: "received"

        };

        currentConversation.messages.push(
            reply
        );

        currentConversation.lastMessage =
            reply.text;

        currentConversation.time =
            reply.time;

        displayMessages();

        displayConversations();

    }, 1500);

}


// ======================================
// SCROLL TO BOTTOM
// ======================================

function scrollToBottom() {

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;

}


// ======================================
// START APPLICATION
// ======================================

displayConversations();

displayMessages();
