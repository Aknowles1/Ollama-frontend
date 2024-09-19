// script.js

document.getElementById('submitBtn').addEventListener('click', function() {
    // Get the user's query from the textarea
    const promptText = document.getElementById('prompt').value.trim();

    if (!promptText) {
        alert('Please enter a query.');
        return;
    }

    // Append "Answer in 20 words or less" to the user's query
    const modifiedPromptText = promptText + "only ever Answer in 20 words or less - where reasonably possible.";

    // Construct the data payload
    const data = {
        model: "llama3.1:8b",
        prompt: modifiedPromptText,
        stream: false
    };

    // Show loading indicator
    document.getElementById('loading').style.display = 'block';
    document.getElementById('response').textContent = '';

    // Make the API request using fetch
    fetch('/api/generate', {  // Using relative path to the API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(async response => {
        // Hide loading indicator
        document.getElementById('loading').style.display = 'none';

        if (!response.ok) {
            // Handle HTTP errors
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }
        return response.json();
    })
    .then(result => {
        // Display only the 'response' field from the API response
        if (result.response) {
            document.getElementById('response').textContent = result.response;
        } else {
            document.getElementById('response').textContent = 'No response field in API result.';
        }
    })
    .catch(error => {
        // Hide loading indicator
        document.getElementById('loading').style.display = 'none';

        // Handle network or parsing errors
        console.error('Error:', error);
        document.getElementById('response').textContent = 'Error: ' + error.message;
    });
});
