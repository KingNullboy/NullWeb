const API = '/api/cookie';

let currentRevision = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('uploadSave')
        .addEventListener('click', uploadSave);

    document.getElementById('downloadSave')
        .addEventListener('click', downloadSave);

    document.getElementById('createToken')
        .addEventListener('click', createToken);

    document.getElementById('copyToken')
        .addEventListener('click', copyToken);

    initializeCookieCloud();
});

async function api(path, options = {}) {
    const response = await fetch(API + path, {
        ...options,
        credentials: 'include',
        headers: {
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...options.headers
        }
    });

    const data = await response.json().catch(() => ({}));

    if (response.status === 401) {
        window.location.href = '/socialmedia/login.php';
        throw new Error('Authentication required');
    }

    if (!response.ok) {
        const error = new Error(data.error || 'Request failed');
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
}

function message(text, error = false) {
    const element = document.getElementById('cookieMessage');
    element.textContent = text;
    element.style.color = error ? '#ff4444' : '#44cc88';
}

async function initializeCookieCloud() {
    try {
        const user = await api('/me');

        document.getElementById('cookieUsername').textContent =
            user.username;

        document.getElementById('cookieNickname').textContent =
            user.nickname || '';

        await Promise.all([
            refreshStatus(),
            refreshTokens()
        ]);
    } catch (err) {
        if (err.message !== 'Authentication required') {
            message(err.message, true);
        }
    }
}

async function refreshStatus() {
    const status = await api('/status');

    currentRevision = status.revision;

    document.getElementById('saveExists').textContent =
        status.exists ? 'Available' : 'No cloud save';

    document.getElementById('saveRevision').textContent =
        status.revision;

    document.getElementById('saveUpdated').textContent =
        status.updatedAt
            ? new Date(status.updatedAt).toLocaleString()
            : 'Never';
}

async function uploadSave() {
    const saveData = document.getElementById('saveData').value;

    if (!saveData.trim()) {
        return message('Enter save data first.', true);
    }

    if (!confirm('Replace your current cloud save?')) return;

    const button = document.getElementById('uploadSave');
    button.disabled = true;

    try {
        const result = await api('/save', {
            method: 'PUT',
            body: JSON.stringify({
                saveData,
                expectedRevision: currentRevision
            })
        });

        currentRevision = result.revision;

        message(
            `Save uploaded. Revision ${result.revision}. ` +
            `${result.originalSize} bytes stored as ` +
            `${result.compressedSize} compressed bytes.`
        );

        await refreshStatus();
    } catch (err) {
        if (err.status === 409) {
            message(
                `Revision conflict! Your expected revision was ` +
                `${err.data.expectedRevision}, but the cloud is at ` +
                `${err.data.currentRevision}. Refreshing status.`,
                true
            );

            await refreshStatus();
        } else {
            message(err.message, true);
        }
    } finally {
        button.disabled = false;
    }
}

async function downloadSave() {
    const button = document.getElementById('downloadSave');
    button.disabled = true;

    try {
        const result = await api('/save');

        const blob = new Blob(
            [result.saveData],
            { type: 'text/plain;charset=utf-8' }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'cookie-clicker-save.txt';
        link.click();

        URL.revokeObjectURL(url);

        message(`Downloaded cloud save, revision ${result.revision}.`);
    } catch (err) {
        message(err.message, true);
    } finally {
        button.disabled = false;
    }
}

async function createToken() {
    const name = document.getElementById('tokenName').value.trim();

    if (!name) {
        return message('Enter a token name.', true);
    }

    const scopes = [];

    if (document.getElementById('scopeRead').checked)
        scopes.push('save:read');

    if (document.getElementById('scopeWrite').checked)
        scopes.push('save:write');

    if (document.getElementById('scopeDelete').checked)
        scopes.push('save:delete');

    if (!scopes.length) {
        return message('Select at least one permission.', true);
    }

    try {
        const result = await api('/tokens', {
            method: 'POST',
            body: JSON.stringify({ name, scopes })
        });

        document.getElementById('tokenValue').textContent =
            result.token;

        document.getElementById('newToken').style.display = 'block';

        document.getElementById('tokenName').value = '';

        message('Token created. Copy it now; it cannot be retrieved later.');

        await refreshTokens();
    } catch (err) {
        message(err.message, true);
    }
}

async function copyToken() {
    const token = document.getElementById('tokenValue').textContent;

    try {
        await navigator.clipboard.writeText(token);
        message('Token copied.');
    } catch {
        message('Could not access clipboard. Copy the token manually.', true);
    }
}

async function refreshTokens() {
    const result = await api('/tokens');
    const container = document.getElementById('tokenList');

    container.replaceChildren();

    if (!result.tokens.length) {
        container.textContent = 'No API tokens.';
        return;
    }

    for (const token of result.tokens) {
        const item = document.createElement('div');
        item.className = 'cookie-token';

        const heading = document.createElement('strong');
        heading.textContent = token.name;

        const details = document.createElement('p');
        details.textContent =
            `Permissions: ${token.scopes.join(', ')} | ` +
            `Created: ${new Date(token.created_at).toLocaleString()}`;

        const status = document.createElement('p');
        status.textContent = token.revoked_at
            ? 'Revoked'
            : 'Active';

        item.append(heading, details, status);

        if (!token.revoked_at) {
            const revoke = document.createElement('button');
            revoke.className = 'headerbtn';
            revoke.textContent = 'Revoke Token';

            revoke.addEventListener('click', async () => {
                if (!confirm(`Revoke "${token.name}"?`)) return;

                try {
                    await api(`/tokens/${encodeURIComponent(token.id)}`, {
                        method: 'DELETE'
                    });

                    message('Token revoked.');
                    await refreshTokens();
                } catch (err) {
                    message(err.message, true);
                }
            });

            item.append(revoke);
        }

        container.append(item);
    }
}