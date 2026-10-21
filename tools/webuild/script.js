(() => {
    const canvas = document.getElementById('canvas');
    const inspector = document.getElementById('inspector');
    const deleteButton = document.getElementById('deleteElement');
    const exportPanel = document.getElementById('exportPanel');
    const exportOutput = document.getElementById('exportOutput');
    let selected = null;

    const placeholderImage = `data:image/svg+xml,${encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><rect width="320" height="180" fill="#252722"/><path d="M80 125l45-48 32 33 24-23 59 38z" fill="#737b62"/><circle cx="222" cy="55" r="14" fill="#c8f169"/><text x="160" y="160" fill="#d6d8ce" font-family="sans-serif" font-size="13" text-anchor="middle">Add an image URL in the inspector</text></svg>'
    )}`;

    function updateCanvasState() {
        const elements = canvas.querySelectorAll('.element');
        document.getElementById('elementCount').textContent = `${elements.length} element${elements.length === 1 ? '' : 's'}`;
        document.getElementById('canvasEmpty').hidden = elements.length > 0;
    }

    function makeDraggable(element) {
        element.addEventListener('pointerdown', event => {
            if (event.button !== 0) return;
            event.preventDefault();
            selectElement(element);
            const bounds = canvas.getBoundingClientRect();
            const offsetX = event.clientX - bounds.left - element.offsetLeft;
            const offsetY = event.clientY - bounds.top - element.offsetTop;

            function move(moveEvent) {
                const maxLeft = Math.max(0, canvas.clientWidth - element.offsetWidth);
                const maxTop = Math.max(0, canvas.scrollHeight - element.offsetHeight);
                element.style.left = `${Math.min(maxLeft, Math.max(0, moveEvent.clientX - bounds.left - offsetX))}px`;
                element.style.top = `${Math.min(maxTop, Math.max(0, moveEvent.clientY - bounds.top - offsetY))}px`;
                renderInspector(element);
            }
            function finish() {
                document.removeEventListener('pointermove', move);
                document.removeEventListener('pointerup', finish);
                document.removeEventListener('pointercancel', finish);
            }
            document.addEventListener('pointermove', move);
            document.addEventListener('pointerup', finish);
            document.addEventListener('pointercancel', finish);
        });
    }

    function createElement(type) {
        const tags = { heading: 'h1', text: 'p', button: 'button', image: 'img' };
        const element = document.createElement(tags[type]);
        element.className = `element element-${type}`;
        element.style.left = '28px';
        element.style.top = `${28 + canvas.querySelectorAll('.element').length * 22}px`;
        element.style.color = '#f4f1e8';
        element.style.fontSize = type === 'heading' ? '32px' : '16px';
        if (type === 'heading') element.textContent = 'Your heading';
        if (type === 'text') element.textContent = 'Write a little something here.';
        if (type === 'button') {
            element.type = 'button';
            element.textContent = 'Learn more';
            element.dataset.href = '';
            element.style.backgroundColor = '#c8f169';
            element.style.color = '#111111';
            element.style.width = '150px';
            element.style.height = '44px';
        }
        if (type === 'image') {
            element.src = placeholderImage;
            element.alt = 'Image placeholder';
            element.style.width = '240px';
            element.style.height = '135px';
        }
        makeDraggable(element);
        canvas.append(element);
        selectElement(element);
        updateCanvasState();
    }

    function selectElement(element) {
        canvas.querySelectorAll('.element').forEach(item => item.classList.toggle('is-selected', item === element));
        selected = element;
        deleteButton.disabled = false;
        renderInspector(element);
    }

    function addField(labelText, value, type, onChange) {
        const label = document.createElement('label');
        label.className = 'inspector-field';
        label.append(document.createTextNode(labelText));
        const input = document.createElement('input');
        input.type = type;
        input.value = value;
        input.addEventListener('input', () => onChange(input.value));
        label.append(input);
        inspector.append(label);
    }

    function colorToHex(color) {
        const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        return match ? `#${match.slice(1, 4).map(value => Number(value).toString(16).padStart(2, '0')).join('')}` : '#ffffff';
    }

    function renderInspector(element) {
        inspector.replaceChildren();
        const type = element.classList.contains('element-heading') ? 'Heading'
            : element.classList.contains('element-text') ? 'Paragraph'
            : element.classList.contains('element-button') ? 'Button'
            : 'Image';
        const heading = document.createElement('p');
        heading.className = 'inspector-kind';
        heading.textContent = type;
        inspector.append(heading);

        if (element.tagName === 'IMG') {
            addField('Image URL', element.src, 'text', value => {
                if (value.startsWith('https://') || value.startsWith('http://') || value.startsWith('data:image/')) element.src = value;
            });
            addField('Alternative text', element.alt, 'text', value => { element.alt = value; });
        } else {
            addField('Text', element.textContent, 'text', value => { element.textContent = value; });
        }
        if (element.classList.contains('element-button')) {
            addField('Link URL (optional)', element.dataset.href || '', 'text', value => { element.dataset.href = value; });
        }
        addField('Font size (px)', parseInt(getComputedStyle(element).fontSize, 10), 'number', value => {
            const size = Number(value);
            if (Number.isFinite(size) && size >= 8 && size <= 160) element.style.fontSize = `${size}px`;
        });
        addField('Text color', colorToHex(getComputedStyle(element).color), 'color', value => { element.style.color = value; });
        addField('Background color', colorToHex(getComputedStyle(element).backgroundColor), 'color', value => { element.style.backgroundColor = value; });
        addField('Width (px)', element.offsetWidth, 'number', value => {
            const width = Number(value);
            if (Number.isFinite(width) && width >= 30 && width <= 2000) element.style.width = `${width}px`;
        });
        addField('Height (px)', element.offsetHeight, 'number', value => {
            const height = Number(value);
            if (Number.isFinite(height) && height >= 20 && height <= 2000) element.style.height = `${height}px`;
        });
        addField('Left (px)', parseInt(element.style.left, 10), 'number', value => {
            const left = Number(value);
            if (Number.isFinite(left) && left >= 0) element.style.left = `${left}px`;
        });
        addField('Top (px)', parseInt(element.style.top, 10), 'number', value => {
            const top = Number(value);
            if (Number.isFinite(top) && top >= 0) element.style.top = `${top}px`;
        });
    }

    function escapeHtml(value) {
        return value.replace(/[&<>"']/g, character => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[character]));
    }

    function safeLink(value) {
        if (value.startsWith('/') && !value.startsWith('//')) return value;
        try {
            const url = new URL(value);
            return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
        } catch (_) {
            return '';
        }
    }

    function exportPage() {
        const elements = [...canvas.querySelectorAll('.element')].map(element => {
            const left = Math.max(0, parseFloat(element.style.left) || 0);
            const top = Math.max(0, parseFloat(element.style.top) || 0);
            const width = Math.max(30, element.offsetWidth);
            const height = Math.max(20, element.offsetHeight);
            const style = `position:absolute;left:${left}px;top:${top}px;width:${width}px;height:${height}px;color:${element.style.color || '#111111'};background-color:${element.style.backgroundColor || 'transparent'};font-size:${parseFloat(element.style.fontSize) || 16}px;`;
            if (element.tagName === 'IMG') {
                const source = element.src.startsWith('data:image/') || safeLink(element.src) ? element.src : '';
                return `<img src="${escapeHtml(source)}" alt="${escapeHtml(element.alt)}" style="${style}object-fit:cover;">`;
            }
            const text = escapeHtml(element.textContent);
            if (element.classList.contains('element-button')) {
                const href = safeLink(element.dataset.href || '');
                return href
                    ? `<a href="${escapeHtml(href)}" style="${style}display:grid;place-items:center;text-decoration:none;">${text}</a>`
                    : `<button type="button" style="${style}">${text}</button>`;
            }
            const tag = element.classList.contains('element-heading') ? 'h1' : 'p';
            return `<${tag} style="${style}">${text}</${tag}>`;
        }).join('\n');
        return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My page</title>
    <style>body{margin:0;font-family:Arial,sans-serif}.page{position:relative;min-height:100vh;background:#fff;overflow:hidden}</style>
</head>
<body>
    <main class="page">
${elements.split('\n').map(line => `        ${line}`).join('\n')}
    </main>
</body>
</html>`;
    }

    document.querySelectorAll('[data-add]').forEach(button => {
        button.addEventListener('click', () => createElement(button.dataset.add));
    });
    deleteButton.addEventListener('click', () => {
        if (!selected) return;
        selected.remove();
        selected = null;
        deleteButton.disabled = true;
        inspector.innerHTML = '<p class="inspector-empty">Select an element on the canvas to edit it.</p>';
        updateCanvasState();
    });
    document.getElementById('clearCanvas').addEventListener('click', () => {
        canvas.querySelectorAll('.element').forEach(element => element.remove());
        selected = null;
        deleteButton.disabled = true;
        inspector.innerHTML = '<p class="inspector-empty">Select an element on the canvas to edit it.</p>';
        exportPanel.hidden = true;
        updateCanvasState();
    });
    document.getElementById('exportButton').addEventListener('click', () => {
        exportOutput.value = exportPage();
        exportPanel.hidden = false;
        exportPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    document.getElementById('copyExport').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(exportOutput.value);
            document.getElementById('exportStatus').textContent = 'HTML copied to clipboard.';
        } catch (_) {
            exportOutput.select();
            document.getElementById('exportStatus').textContent = 'Clipboard access was blocked. Select and copy the HTML above.';
        }
    });
    document.getElementById('downloadExport').addEventListener('click', () => {
        const file = new Blob([exportOutput.value], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'nullweb-page.html';
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        document.getElementById('exportStatus').textContent = 'HTML download started.';
    });
    canvas.addEventListener('click', event => {
        if (event.target === canvas) {
            canvas.querySelectorAll('.element').forEach(element => element.classList.remove('is-selected'));
            selected = null;
            deleteButton.disabled = true;
            inspector.innerHTML = '<p class="inspector-empty">Select an element on the canvas to edit it.</p>';
        }
    });
    updateCanvasState();
})();
