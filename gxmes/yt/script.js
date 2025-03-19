function generateSafeEmbed() {
    const youtubeUrl = document.getElementById('youtubeUrl').value;
    const videoId = extractVideoId(youtubeUrl);
    
    if (videoId) {
        const youtubeEducationUrl = `https://www.youtubeeducation.com/watch?v=${videoId}`;
        
        // Create the iframe element for the Plyr player
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', youtubeEducationUrl);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');

        // Clear any previous content
        const playerContainer = document.getElementById('playerContainer');
        playerContainer.innerHTML = ''; // Clear previous player

        // Append the new iframe to the container
        playerContainer.appendChild(iframe);

        // Initialize Plyr for the iframe
        const player = new Plyr(iframe);
    } else {
        alert("Please enter a valid YouTube URL.");
    }
}

function extractVideoId(url) {
    // Extracts the video ID from a YouTube URL
    return url.replace("https://www.youtube.com/watch?v=", "");
}