(() => {
    const storageKey = 'nullrng:history:v1';
    const result = document.getElementById('result');
    const historyList = document.getElementById('history');
    const copyButton = document.getElementById('copyResult');
    const status = document.getElementById('rngStatus');
    const error = document.getElementById('rngError');
    const message = document.getElementById('rngMessage');
    let current = '';
    let history = [];
    let storageAvailable = true;

    function secureRandomUnit() {
        if (!window.crypto?.getRandomValues) throw new Error('Secure randomness is unavailable in this browser.');
        const words = new Uint32Array(2);
        window.crypto.getRandomValues(words);
        const value = (BigInt(words[0]) << 21n) | (BigInt(words[1]) >> 11n);
        return Number(value) / 9007199254740992;
    }

    function secureRandomBelow(bound) {
        if (!window.crypto?.getRandomValues) throw new Error('Secure randomness is unavailable in this browser.');
        const bitLength = bound.toString(2).length;
        const wordCount = Math.ceil(bitLength / 32);
        const excessBits = wordCount * 32 - bitLength;
        const words = new Uint32Array(wordCount);
        const sampleSpace = 1n << BigInt(bitLength);
        const cutoff = sampleSpace - (sampleSpace % bound);
        let value;
        do {
            window.crypto.getRandomValues(words);
            value = words.reduce((total, word) => (total << 32n) | BigInt(word), 0n);
            value >>= BigInt(excessBits);
        } while (value >= cutoff);
        return value % bound;
    }

    function renderHistory() {
        historyList.replaceChildren();
        if (!history.length) {
            const empty = document.createElement('div');
            empty.className = 'list-empty';
            empty.textContent = 'Your results will appear here.';
            historyList.append(empty);
            return;
        }
        history.forEach(item => {
            const row = document.createElement('button');
            row.type = 'button';
            row.className = 'history-item';
            row.title = 'Copy this result';
            const value = document.createElement('span');
            value.textContent = item.value;
            const type = document.createElement('small');
            type.textContent = item.type === 'integer' ? 'Integer' : 'Decimal';
            row.append(value, type);
            row.addEventListener('click', () => copyValue(item.value));
            historyList.append(row);
        });
    }

    function saveHistory() {
        if (!storageAvailable) return;
        try {
            localStorage.setItem(storageKey, JSON.stringify(history));
        } catch (_) {
            storageAvailable = false;
            status.textContent = 'History is session-only';
            message.textContent = 'Browser storage is unavailable; new results will remain until this page is closed.';
        }
    }

    async function copyValue(value) {
        try {
            await navigator.clipboard.writeText(value);
            message.textContent = `Copied ${value}.`;
        } catch (_) {
            message.textContent = 'Clipboard access was blocked by the browser.';
        }
    }

    function generate() {
        error.hidden = true;
        message.textContent = '';
        const minInput = document.getElementById('min').value.trim();
        const maxInput = document.getElementById('max').value.trim();
        const min = Number(minInput);
        const max = Number(maxInput);
        const type = document.getElementById('type').value;
        if (!minInput || !maxInput || !Number.isFinite(min) || !Number.isFinite(max) || min > max) {
            error.textContent = 'Enter finite bounds with a minimum no greater than the maximum.';
            error.hidden = false;
            return;
        }

        try {
            if (type === 'integer') {
                if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max)) {
                    throw new Error('Integer bounds must be whole numbers within the safe integer range.');
                }
                const lower = BigInt(min);
                current = String(lower + secureRandomBelow(BigInt(max) - lower + 1n));
            } else {
                const range = max - min;
                if (!Number.isFinite(range)) throw new Error('The decimal range is too large.');
                current = String(Number((min + secureRandomUnit() * range).toPrecision(12)));
            }
            result.textContent = current;
            copyButton.disabled = false;
            history.unshift({ value: current, type });
            history = history.slice(0, 20);
            renderHistory();
            saveHistory();
        } catch (exception) {
            error.textContent = exception.message;
            error.hidden = false;
        }
    }

    try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
        if (Array.isArray(saved)) {
            history = saved.filter(item => item
                && typeof item.value === 'string'
                && ['integer', 'real'].includes(item.type)).slice(0, 20);
        }
    } catch (_) {
        storageAvailable = false;
        status.textContent = 'History is session-only';
        message.textContent = 'Could not read saved history from this browser.';
    }
    if (!storageAvailable) status.classList.add('status-warning');
    else if (window.crypto?.getRandomValues) status.textContent = 'Secure local randomness';
    else status.textContent = 'Secure randomness unavailable';
    renderHistory();

    document.getElementById('generate').addEventListener('click', generate);
    copyButton.addEventListener('click', () => copyValue(current));
    document.getElementById('clearHistory').addEventListener('click', () => {
        history = [];
        renderHistory();
        saveHistory();
        message.textContent = 'History cleared.';
    });
})();
