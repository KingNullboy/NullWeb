(() => {
    const form = document.getElementById('portalForm');
    const input = document.getElementById('urlInput');
    const error = document.getElementById('portalError');
    const panel = document.getElementById('previewPanel');
    const frame = document.getElementById('portalFrame');
    let current = '';

    form.addEventListener('submit', event => {
        event.preventDefault();
        let value = input.value.trim();
        if (/^[a-z][a-z\d+.-]*:\/\//i.test(value) && !/^https?:\/\//i.test(value)) {
            error.textContent = 'Only http:// and https:// websites can be opened.';
            error.hidden = false;
            return;
        }
        if (value && !/^https?:\/\//i.test(value)) value = `https://${value}`;
        try {
            const url = new URL(value);
            if (!['http:', 'https:'].includes(url.protocol)) throw new Error('protocol');
            current = url.href;
            input.value = current;
            error.hidden = true;
            frame.src = current;
            document.getElementById('previewTitle').textContent = url.hostname;
            panel.hidden = false;
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (_) {
            error.textContent = 'Enter a complete http:// or https:// website address.';
            error.hidden = false;
        }
    });

    document.getElementById('backButton').addEventListener('click', () => {
        frame.src = 'about:blank';
        panel.hidden = true;
    });
    document.getElementById('newTabButton').addEventListener('click', () => {
        if (current) window.open(current, '_blank', 'noopener,noreferrer');
    });
    document.getElementById('fullscreenButton').addEventListener('click', async () => {
        try {
            if (document.fullscreenElement) await document.exitFullscreen();
            else await frame.requestFullscreen();
        } catch (_) {
            error.textContent = 'Full screen is not available in this browser.';
            error.hidden = false;
        }
    });
})();
