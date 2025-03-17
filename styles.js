// Function to update styles based on stored preferences
function updateStyles() {
    // Get the stored preferences from localStorage (or use default values)
    const storedBgColor = localStorage.getItem('bg-color') || '#000000';
    const storedTextColor = localStorage.getItem('text-color') || '#ffffff';
    const storedBorderColor = localStorage.getItem('border-color') || '#ffffff';
    const storedFontFamily = localStorage.getItem('font-family') || 'Lato';
    const storedClickSoundUrl = localStorage.getItem('click-sound-url') || '/click.mp3';

    // Set the CSS variables dynamically
    document.documentElement.style.setProperty('--bg-color', storedBgColor);
    document.documentElement.style.setProperty('--text-color', storedTextColor);
    document.documentElement.style.setProperty('--border-color', storedBorderColor);
    document.documentElement.style.setProperty('--font-family', storedFontFamily);
}

// Function to play a click sound
function playClickSound() {
    const clickSoundUrl = localStorage.getItem('click-sound-url') || '/click.mp3';
    const audio = new Audio(clickSoundUrl);
    audio.play();
}

// Event listener to handle changes when customizing themes
document.addEventListener('DOMContentLoaded', function() {
    updateStyles();
    
    if (window.location.href === window.location.protocol + "//" + document.domain + "/styles.html") {
        const bgColorInput = document.getElementById('bg-color');
        const textColorInput = document.getElementById('text-color');
        const borderColorInput = document.getElementById('border-color');
        const fontFamilyInput = document.getElementById('font-family');
        const clickSoundUrl = document.getElementById('click-sound');
        const resetButton = document.getElementById('reset-btn');

        // Load stored preferences into input fields when the page is loaded
        bgColorInput.value = localStorage.getItem('bg-color') || '#000000';
        textColorInput.value = localStorage.getItem('text-color') || '#ffffff';
        borderColorInput.value = localStorage.getItem('border-color') || '#ffffff';
        fontFamilyInput.value = localStorage.getItem('font-family') || 'Lato';
        clickSoundUrl.value = localStorage.getItem('click-sound-url') || '/click.mp3';
    
        // Update the styles when inputs change
        bgColorInput.addEventListener('input', function() {
            const bgColor = bgColorInput.value;
            localStorage.setItem('bg-color', bgColor);
            document.documentElement.style.setProperty('--bg-color', bgColor);
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

        clickSoundUrl.addEventListener('input', function() {
            const clickSound = clickSoundUrl.value;
            localStorage.setItem('click-sound-url', clickSound);
        });

        // Reset to default values
        resetButton.addEventListener('click', function() {
            // Play the click sound when reset is clicked
            playClickSound();

            // Reset to default values
            localStorage.setItem('bg-color', '#000000');
            localStorage.setItem('text-color', '#ffffff');
            localStorage.setItem('border-color', '#ffffff');
            localStorage.setItem('font-family', 'Lato');
            localStorage.setItem('click-sound-url', '/click.mp3'); // Reset to default click sound URL

            // Update the input values
            bgColorInput.value = '#000000';
            textColorInput.value = '#ffffff';
            borderColorInput.value = '#ffffff';
            fontFamilyInput.value = 'Lato';
            clickSoundUrl.value = '/click.mp3'; // Reset the click sound URL input

            // Apply the default styles
            updateStyles();
        });
    }

    // Apply initial styles based on saved preferences
    updateStyles();

    // Add click sound to all buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            playClickSound();
        });
    });
});