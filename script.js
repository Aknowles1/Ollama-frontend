document.getElementById('submitBtn').addEventListener('click', function() {
    // Get the user's query from the textarea
    const promptText = document.getElementById('prompt').value.trim();

    if (!promptText) {
        alert('Please enter a query.');
        return;
    }

    // Construct the data payload
    const data = {
        model: "llama3.1:8b",
        prompt: promptText,
        stream: false
    };

    // Show loading indicator
    document.getElementById('loading').style.display = 'block';
    document.getElementById('response').textContent = '';

    // Make the API request using fetch
    fetch('http://92.14.181.114:11434/api/generate', {
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
        document.getElementById('response').textContent = result.response;
    })
    .catch(error => {
        // Hide loading indicator
        document.getElementById('loading').style.display = 'none';

        // Handle network or parsing errors
        console.error('Error:', error);
        document.getElementById('response').textContent = 'Error: ' + error.message;
    });
});
