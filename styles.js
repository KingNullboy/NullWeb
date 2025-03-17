// Function to update styles based on stored preferences
function updateStyles() {
    const storedBgColor = localStorage.getItem('bg-color') || '#000000';
    const storedTextColor = localStorage.getItem('text-color') || '#ffffff';
    const storedBorderColor = localStorage.getItem('border-color') || '#ffffff';
    const storedFontFamily = localStorage.getItem('font-family') || 'Lato';
    const storedBgImage = localStorage.getItem('bg-image');

    // Set the CSS variables dynamically
    document.documentElement.style.setProperty('--bg-color', storedBgColor);
    document.documentElement.style.setProperty('--text-color', storedTextColor);
    document.documentElement.style.setProperty('--border-color', storedBorderColor);
    document.documentElement.style.setProperty('--font-family', storedFontFamily);

    // Check if background image exists, otherwise use the background color
    if (storedBgImage && storedBgImage !== '') {
        document.body.style.backgroundImage = `url(${storedBgImage})`;
        document.body.style.backgroundSize = 'cover'; // Make sure the image covers the entire background
    } else {
        document.body.style.backgroundColor = storedBgColor; // Use the background color if no image is set
        document.body.style.backgroundImage = ''; // Ensure no background image is set
    }
}

// Event listener to handle changes when customizing themes
document.addEventListener('DOMContentLoaded', function() {
    // Get the current page URL
    const currentPageUrl = window.location.protocol + "//" + document.domain + window.location.pathname;

    // Check if the current page is either '/styles.html' or '/styles' (without the slash)
    if (currentPageUrl === window.location.protocol + "//" + document.domain + "/styles.html" || currentPageUrl === window.location.protocol + "//" + document.domain + "/styles") {
        const bgColorInput = document.getElementById('bg-color');
        const textColorInput = document.getElementById('text-color');
        const borderColorInput = document.getElementById('border-color');
        const fontFamilyInput = document.getElementById('font-family');
        const bgImageInput = document.getElementById('bg-image');
        const resetButton = document.getElementById('reset-btn');

        // Load stored preferences into input fields when the page is loaded
        bgColorInput.value = localStorage.getItem('bg-color') || '#000000';
        textColorInput.value = localStorage.getItem('text-color') || '#ffffff';
        borderColorInput.value = localStorage.getItem('border-color') || '#ffffff';
        fontFamilyInput.value = localStorage.getItem('font-family') || 'Lato';
        bgImageInput.value = localStorage.getItem('bg-image') || '';

        // Update the styles when inputs change
        bgColorInput.addEventListener('input', function() {
            const bgColor = bgColorInput.value;
            localStorage.setItem('bg-color', bgColor);
            document.documentElement.style.setProperty('--bg-color', bgColor);

            // If no background image URL is set, apply the background color
            const bgImageUrl = localStorage.getItem('bg-image');
            if (!bgImageUrl || bgImageUrl === '') {
                document.body.style.backgroundColor = bgColor;
                document.body.style.backgroundImage = '';
            }
        });

        textColorInput.addEventListener('input', function() {
            const textColor = textColorInput.value;
            localStorage.setItem('text-color', textColor);
            document.documentElement.style.setProperty('--text-color', textColor);
        });

        borderColorInput.addEventListener('input', function() {
            const borderColor = borderColorInput.value;
            localStorage.setItem('border-color', borderColor);
            document.documentElement.style.setProperty('--border-color', borderColor);
        });

        fontFamilyInput.addEventListener('input', function() {
            const fontFamily = fontFamilyInput.value;
            localStorage.setItem('font-family', fontFamily);
            document.documentElement.style.setProperty('--font-family', fontFamily);
        });

        bgImageInput.addEventListener('input', function() {
            const bgImageUrl = bgImageInput.value;
            localStorage.setItem('bg-image', bgImageUrl);

            // If a background image URL is entered, apply it, otherwise use background color
            if (bgImageUrl && bgImageUrl !== '') {
                document.body.style.backgroundImage = `url(${bgImageUrl})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundColor = ''; // Remove background color if image is set
            } else {
                document.body.style.backgroundImage = '';
                const bgColor = localStorage.getItem('bg-color') || '#000000';
                document.body.style.backgroundColor = bgColor; // Use the background color as a fallback
            }
        });

        // Reset to default values
        resetButton.addEventListener('click', function() {
            localStorage.setItem('bg-color', '#000000');
            localStorage.setItem('text-color', '#ffffff');
            localStorage.setItem('border-color', '#ffffff');
            localStorage.setItem('font-family', 'Lato');
            localStorage.setItem('bg-image', ''); // Reset background image URL

            bgColorInput.value = '#000000';
            textColorInput.value = '#ffffff';
            borderColorInput.value = '#ffffff';
            fontFamilyInput.value = 'Lato';
            bgImageInput.value = ''; // Reset the background image URL input

            // Apply the default styles
            updateStyles();
        });
    }
});