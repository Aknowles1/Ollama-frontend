# Front-End Interface for API Query

This project provides a simple front-end web interface that allows users to input a query into a text box. The input is used to substitute the `prompt` field in a request sent to your API (`http://92.14.181.114:11434/api/generate`). The API response is then displayed on the web page.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Code Explanation](#code-explanation)
- [Handling CORS Issues](#handling-cors-issues)
- [Enhancements](#enhancements)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Introduction

This application serves as a front-end interface for interacting with your specified API. It allows users to submit queries and receive responses without the need to use command-line tools like `curl`.

## Features

- User-friendly interface with a text area for input.
- Sends POST requests to the API with the user's query.
- Displays the API response in a formatted manner.
- Includes error handling and loading indicators.

## Prerequisites

- A modern web browser (e.g., Chrome, Firefox).
- Access to the API endpoint: `http://92.14.181.114:11434/api/generate`.

## Installation

1. **Clone or Download the Repository**

   You can clone the repository using Git:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   ```

   Or simply download the ZIP file and extract it.

2. **Navigate to the Project Directory**

   ```bash
   cd your-repo
   ```

3. **[Optional] Start a Local Web Server**

   For security reasons, some browsers may block AJAX requests from local files. Starting a local server can help avoid these issues.

   - Using Python 3:

     ```bash
     python -m http.server 8000
     ```

   - Using Python 2:

     ```bash
     python -m SimpleHTTPServer 8000
     ```

## Usage

1. **Open the Web Page**

   - If you started a local server, navigate to `http://localhost:8000` in your web browser.
   - If not, open `index.html` directly in your browser (note that some features might not work due to browser security settings).

2. **Submit a Query**

   - Type your question or prompt into the text area labeled "Ask a Question".
   - Click the "Submit" button.

3. **View the Response**

   - A loading indicator will appear while the request is being processed.
   - The API response will be displayed under the "Response" section.


## Enhancements

### Loading Indicator

- A loading message appears while the API request is being processed.

### Error Messages

- User-friendly error messages are displayed in case of network issues or invalid responses.

### Response Formatting

- The API response is displayed in a formatted JSON structure for better readability.

## Troubleshooting

### Common Issues

- **CORS Errors**: Ensure the API server allows cross-origin requests.
- **Network Errors**: Check the API endpoint URL and your internet connection.
- **JSON Parsing Errors**: Verify that the API returns valid JSON data.

### Tips

- Use the browser's developer console to view error messages and debug issues.
- Ensure that your API server is running and accessible from your network.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to customize and expand upon this README to suit your project's needs.