(() => {
    const imageInput = document.getElementById('imageInput');
    const dropZone = document.getElementById('dropZone');
    const widthInput = document.getElementById('widthInput');
    const widthValue = document.getElementById('widthValue');
    const charsetInput = document.getElementById('charsetInput');
    const colorToggle = document.getElementById('colorToggle');
    const invertToggle = document.getElementById('invertToggle');
    const convertButton = document.getElementById('convertButton');
    const output = document.getElementById('asciiOutput');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const fileError = document.getElementById('fileError');
    const previewState = document.getElementById('previewState');
    const imageSummary = document.getElementById('imageSummary');
    const copyButton = document.getElementById('copyButton');
    const downloadButton = document.getElementById('downloadButton');

    const charsets = {
        dense: ' .,:;irsXA253hMHGS#9B&@',
        simple: ' .:-=+*#%@',
        blocks: ' ░▒▓█',
        binary: ' 01'
    };

    let image = null;
    let currentText = '';
    let currentFileName = 'nullascii';

    function showError(message) {
        fileError.textContent = message;
        fileError.hidden = !message;
    }

    function loadFile(file) {
        showError('');
        if (!file || !file.type.startsWith('image/')) {
            showError('Choose a valid image file first.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const nextImage = new Image();
            nextImage.onload = () => {
                image = nextImage;
                currentFileName = (file.name || 'nullascii').replace(/\.[^.]+$/, '') || 'nullascii';
                imageSummary.textContent = `${file.name} · ${nextImage.naturalWidth} × ${nextImage.naturalHeight}`;
                previewState.textContent = 'Ready';
                convert();
            };
            nextImage.onerror = () => showError('That image could not be read.');
            nextImage.src = event.target.result;
        };
        reader.onerror = () => showError('The image could not be loaded.');
        reader.readAsDataURL(file);
    }

    function convert() {
        if (!image) {
            showError('Choose an image first.');
            return;
        }

        const width = Number(widthInput.value);
        const characterRatio = 0.52;
        const height = Math.max(1, Math.round((image.naturalHeight / image.naturalWidth) * width * characterRatio));
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(image, 0, 0, width, height);

        const pixels = ctx.getImageData(0, 0, width, height).data;
        const chars = charsets[charsetInput.value] || charsets.dense;
        const colored = colorToggle.checked;
        const inverted = invertToggle.checked;
        const textLines = [];
        const htmlLines = [];

        for (let y = 0; y < height; y += 1) {
            let textLine = '';
            let htmlLine = '';
            for (let x = 0; x < width; x += 1) {
                const index = (y * width + x) * 4;
                const r = pixels[index];
                const g = pixels[index + 1];
                const b = pixels[index + 2];
                const alpha = pixels[index + 3] / 255;
                const brightness = ((0.299 * r + 0.587 * g + 0.114 * b) * alpha) + (255 * (1 - alpha));
                const normalized = inverted ? 1 - (brightness / 255) : brightness / 255;
                const character = chars[Math.min(chars.length - 1, Math.floor(normalized * chars.length))];
                textLine += character;
                htmlLine += colored
                    ? `<span style="color:rgb(${r},${g},${b});">${character === ' ' ? '&nbsp;' : character}</span>`
                    : character === ' ' ? '&nbsp;' : character;
            }
            textLines.push(textLine);
            htmlLines.push(htmlLine);
        }

        currentText = textLines.join('\n');
        output.innerHTML = htmlLines.join('<br>');
        previewState.textContent = `${width} × ${height}`;
        copyButton.disabled = false;
        downloadButton.disabled = false;
    }

    function updateWidth() {
        widthValue.textContent = widthInput.value;
        if (image) convert();
    }

    imageInput.addEventListener('change', () => loadFile(imageInput.files[0]));
    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropZone.classList.add('is-dragging');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('is-dragging'));
    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        dropZone.classList.remove('is-dragging');
        loadFile(event.dataTransfer.files[0]);
    });
    widthInput.addEventListener('input', updateWidth);
    charsetInput.addEventListener('change', convert);
    colorToggle.addEventListener('change', convert);
    invertToggle.addEventListener('change', convert);
    convertButton.addEventListener('click', convert);

    copyButton.addEventListener('click', async () => {
        if (!currentText) return;
        await navigator.clipboard.writeText(currentText);
        const original = copyButton.textContent;
        copyButton.textContent = 'Copied';
        setTimeout(() => { copyButton.textContent = original; }, 1200);
    });

    downloadButton.addEventListener('click', () => {
        if (!currentText) return;
        const blob = new Blob([currentText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${currentFileName}-ascii.txt`;
        link.click();
        URL.revokeObjectURL(url);
    });

    widthValue.textContent = widthInput.value;
})();
