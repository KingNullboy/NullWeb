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
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:[^\/\n\s]+\/\S+\/)+|(?:v=|e(?:mbed|\/)?)?([^"&?\/\s]{11})))/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}