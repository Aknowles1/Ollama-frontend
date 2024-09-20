document.getElementById('submitBtn').addEventListener('click', function() {
    // Get the user's query from the textarea
    const promptText = document.getElementById('prompt').value.trim();

    if (!promptText) {
        document.getElementById('errorMessage').textContent = 'Please enter a query.';
        document.getElementById('errorMessage').style.display = 'block';
        return;
    } else {
        document.getElementById('errorMessage').style.display = 'none';
    }

    // Append instruction to the user's query
    const modifiedPromptText = promptText + " only ever Answer in 20 words or less - where reasonably possible.";

    // Construct the data payload
    const data = {
        model: "llama3.1:8b",
        prompt: modifiedPromptText,
        stream: false
    };

    // Show loading indicator
    document.getElementById('loading').style.display = 'inline-block';
    document.getElementById('response').textContent = '';
    document.getElementById('errorMessage').style.display = 'none';

    // Make the API request using fetch
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
        // Hide error message
        document.getElementById('errorMessage').style.display = 'none';
        // Display the API response
        if (result.response) {
            document.getElementById('response').textContent = result.response;
        } else {
            document.getElementById('response').textContent = 'No response field in API result.';
        }
    })
    .catch(error => {
        // Hide loading indicator
        document.getElementById('loading').style.display = 'none';
        // Display error message
        console.error('Error:', error);
        document.getElementById('errorMessage').textContent = 'Error: ' + error.message;
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('response').textContent = '';
    });
});
