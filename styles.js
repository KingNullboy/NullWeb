// Function to update styles based on stored preferences
function updateStyles() {
    // Get the stored preferences from localStorage (or use default values)
    const storedBgColor = localStorage.getItem('bg-color') || '#000000';
    const storedTextColor = localStorage.getItem('text-color') || '#ffffff';
    const storedBorderColor = localStorage.getItem('border-color') || '#ffffff';
    const storedFontFamily = localStorage.getItem('font-family') || 'Lato';
    const storedLinkColor = localStorage.getItem('link-color') || '#0000FF';  // For links
    const storedLinkHoverColor = localStorage.getItem('link-hover-color') || '#0000FF';  // For link hover

    // Set the CSS variables dynamically
    document.documentElement.style.setProperty('--bg-color', storedBgColor);
    document.documentElement.style.setProperty('--text-color', storedTextColor);
    document.documentElement.style.setProperty('--border-color', storedBorderColor);
    document.documentElement.style.setProperty('--font-family', storedFontFamily);
    document.documentElement.style.setProperty('--link-color', storedLinkColor);
    document.documentElement.style.setProperty('--link-hover-color', storedLinkHoverColor);
}

// Event listener to handle changes when customizing themes
document.addEventListener('DOMContentLoaded', function() {
    updateStyles()

    const bgColorInput = document.getElementById('bg-color');
    const textColorInput = document.getElementById('text-color');
    const borderColorInput = document.getElementById('border-color');
    const fontFamilyInput = document.getElementById('font-family');
    const linkColorInput = document.getElementById('link-color');
    const linkHoverColorInput = document.getElementById('link-hover-color');
    const resetButton = document.getElementById('reset-btn');

    // Load stored preferences into input fields when the page is loaded
    bgColorInput.value = localStorage.getItem('bg-color') || '#000000';
    textColorInput.value = localStorage.getItem('text-color') || '#ffffff';
    borderColorInput.value = localStorage.getItem('border-color') || '#ffffff';
    fontFamilyInput.value = localStorage.getItem('font-family') || 'Lato';
    linkColorInput.value = localStorage.getItem('link-color') || '#0000FF';
    linkHoverColorInput.value = localStorage.getItem('link-hover-color') || '#0000FF';

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

    linkColorInput.addEventListener('input', function() {
        const linkColor = linkColorInput.value;
        localStorage.setItem('link-color', linkColor);
        document.documentElement.style.setProperty('--link-color', linkColor);
    });

    linkHoverColorInput.addEventListener('input', function() {
        const linkHoverColor = linkHoverColorInput.value;
        localStorage.setItem('link-hover-color', linkHoverColor);
        document.documentElement.style.setProperty('--link-hover-color', linkHoverColor);
    });

    // Reset to default values
    resetButton.addEventListener('click', function() {
        // Reset to default values
        localStorage.setItem('bg-color', '#000000');
        localStorage.setItem('text-color', '#ffffff');
        localStorage.setItem('border-color', '#ffffff');
        localStorage.setItem('font-family', 'Lato');
        localStorage.setItem('link-color', '#0000FF');
        localStorage.setItem('link-hover-color', '#0000FF');

        // Update the input values
        bgColorInput.value = '#000000';
        textColorInput.value = '#ffffff';
        borderColorInput.value = '#ffffff';
        fontFamilyInput.value = 'Lato';
        linkColorInput.value = '#0000FF';
        linkHoverColorInput.value = '#0000FF';

        // Apply the default styles
        updateStyles();
    });

    // Apply initial styles based on saved preferences
    updateStyles();
});