function runCode() {
    const code = document.getElementById('codeInput').value;
    let outputText = ""; // Variable to capture output

    try {
        const parsedCode = code
            .replace(/print\((.*?)\)/g, (match, p1) => {
                // Remove quotes around the string for output
                const message = p1.replace(/(^"|"$)/g, '').trim();
                outputText += message + "\n"; // Capture output
                return ''; // Return an empty string to remove the print statement
            }) // Capture print statements
            .replace(/#.*$/gm, '') // Remove single-line comments
            .replace(/\blet\b/g, 'let') // Keep the let keyword
            .replace(/if\s*\((.*?)\)\s*{/g, 'if ($1) {') // Format if statements
            .replace(/else\s*{/g, 'else {') // Format else statements
            .replace(/function\s+(\w+)\s*\((.*?)\)\s*{/g, 'function $1($2) {') // Format function declarations
            .replace(/return\s+(.*?);/g, 'return $1;') // Format return statements
            .replace(/while\s*\((.*?)\)\s*{/g, 'while ($1) {'); // Format while loops

        eval(parsedCode); // Execute the parsed JavaScript code

        // Display the captured output
        document.getElementById('output').textContent = outputText || 'Code executed successfully! Check console for output.';
    } catch (error) {
        document.getElementById('output').textContent = 'Error: ' + error.message;
    }
}

// Function to show help modal
function showHelp() {
    document.getElementById('helpModal').style.display = "block";
}

// Function to close help modal
function closeHelp() {
    document.getElementById('helpModal').style.display = "none";
}

// Close modal when clicking outside of the modal content
window.onclick = function(event) {
    const modal = document.getElementById('helpModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}