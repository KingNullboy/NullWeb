(() => {
    const form = document.getElementById('wolForm');
    const status = document.getElementById('wolStatus');
    const button = document.getElementById('submitButton');
    const macPattern = /^(?:[0-9a-f]{2}[:-]){5}[0-9a-f]{2}$/i;

    form.addEventListener('submit', async event => {
        event.preventDefault();
        status.hidden = true;
        const target = document.getElementById('target').value.trim();
        const mac = document.getElementById('mac').value.trim();
        const port = Number(document.getElementById('port').value);
        if (!target || !macPattern.test(mac) || !Number.isInteger(port) || port < 1 || port > 65535) {
            status.className = 'form-status is-error';
            status.textContent = 'Enter a target, a six-byte MAC address, and a UDP port from 1 to 65535.';
            status.hidden = false;
            return;
        }

        button.disabled = true;
        button.textContent = 'Dispatching…';
        try {
            const response = await fetch('/api/wol', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ target, mac, port })
            });
            const data = await response.json().catch(() => null);
            if (!response.ok) throw new Error(data?.error || data?.message || `Request failed (${response.status}).`);
            if (!data || typeof data.message !== 'string') throw new Error('The Wake-on-LAN endpoint returned an unexpected response.');
            status.className = 'form-status is-success';
            status.textContent = data.message;
        } catch (exception) {
            status.className = 'form-status is-error';
            status.textContent = exception instanceof TypeError
                ? 'Could not connect to the Wake-on-LAN endpoint. Confirm the server is configured and try again.'
                : exception.message;
        } finally {
            status.hidden = false;
            button.disabled = false;
            button.innerHTML = 'Wake machine <b>→</b>';
        }
    });
})();
