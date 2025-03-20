// Function to generate the safe embed code for YouTube Education
function generateSafeEmbed() {
    // Get the YouTube URL from the input field
    const youtubeUrl = document.getElementById('youtubeUrl').value;
    
    // Extract the video ID from the YouTube URL
    const videoId = extractVideoId(youtubeUrl);
    
    // Check if a valid video ID was extracted
    if (videoId) {
        // Create the YouTube Education embed URL with the required parameters
        const youtubeEducationUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
        
        // Generate the iframe embed code
        const iframeCode = `<iframe width="560" height="315" src="${youtubeEducationUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        
        // Insert the iframe embed code into the iframe container
        document.getElementById('iframeContainer').innerHTML = iframeCode;
    } else {
        // Alert the user if the YouTube URL is not valid
        alert("Please enter a valid YouTube URL.");
    }
}

// Function to extract the video ID from a YouTube URL
function extractVideoId(url) {
    return url.replace("https://www.youtube.com/watch?v=", "");
}