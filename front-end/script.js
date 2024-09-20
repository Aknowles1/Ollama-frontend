// Initialize messages array
let messages = [];

// Send message on button click
document.getElementById('submitBtn').addEventListener('click', function() {
    sendMessage();
});

// Optional: Send message on Enter key
document.getElementById('prompt').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

// Function to send message
function sendMessage() {
    // Get the user's input
    const promptText = document.getElementById('prompt').value.trim();

    if (!promptText) {
        document.getElementById('errorMessage').textContent = 'Please enter a message.';
        document.getElementById('errorMessage').style.display = 'block';
        return;
    } else {
        document.getElementById('errorMessage').style.display = 'none';
    }

    // Add user's message to the messages array and display it
    messages.push({ role: 'user', content: promptText });
    displayMessage('user', promptText);

    // Clear the input field
    document.getElementById('prompt').value = '';

    // Append instruction to the user's message
    const modifiedPromptText = promptText + " only ever Answer in 20 words or less - where reasonably possible.";

    // Construct the data payload
    const data = {
        model: "llama3.1:8b",
        prompt: modifiedPromptText,
        stream: false
    };

    // Show loading indicator
    document.getElementById('loading').style.display = 'inline-block';

    // Make the API request
    fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(async response => {
        // Hide loading indicator
        document.getElementById('loading').style.display = 'none';

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }
        return response.json();
    })
    .then(result => {
        if (result.response) {
            // Add assistant's response to the messages array and display it
            messages.push({ role: 'assistant', content: result.response });
            displayMessage('assistant', result.response);
        } else {
            document.getElementById('errorMessage').textContent = 'No response from the API.';
            document.getElementById('errorMessage').style.display = 'block';
        }
    })
    .catch(error => {
        // Hide loading indicator and display error
        document.getElementById('loading').style.display = 'none';
        document.getElementById('errorMessage').textContent = 'Error: ' + error.message;
        document.getElementById('errorMessage').style.display = 'block';
    });
}

// Function to display messages in the chat history
function displayMessage(role, content) {
    const chatHistory = document.getElementById('chatHistory');

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role === 'user' ? 'user-message' : 'assistant-message');

    messageDiv.innerHTML = `<strong>${role === 'user' ? 'You' : 'Assistant'}:</strong> ${content}`;

    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('d-flex', 'mb-2');
    if (role === 'user') {
        messageWrapper.classList.add('justify-content-end');
    } else {
        messageWrapper.classList.add('justify-content-start');
    }
    messageWrapper.appendChild(messageDiv);

    chatHistory.appendChild(messageWrapper);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}
