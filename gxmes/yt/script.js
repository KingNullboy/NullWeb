function generateSafeEmbed() {
    const youtubeUrl = document.getElementById('youtubeUrl').value;
    const videoId = extractVideoId(youtubeUrl);
    
    if (videoId) {
        const youtubeEducationUrl = `https://www.youtubeeducation.com/watch?v=${videoId}`;
        const iframeCode = `<iframe src="${youtubeEducationUrl}" frameborder="0" allowfullscreen></iframe>`;
        document.getElementById('iframeContainer').innerHTML = iframeCode;
    } else {
        alert("Please enter a valid YouTube URL.");
    }
}

function extractVideoId(url) {
    return url.replace("https://www.youtube.com/watch?v=", "");
}