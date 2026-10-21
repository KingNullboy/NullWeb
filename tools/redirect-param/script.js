(() => {
    const query = new URLSearchParams(location.search);
    const firstUrl = query.get('url1');
    const returningUrl = query.get('url2');
    const builderPanel = document.getElementById('builderPanel');
    const router = document.getElementById('routerMessage');

    function safeHttpUrl(value) {
        try {
            const url = new URL(value);
            return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
        } catch (_) {
            return null;
        }
    }

    function campaignStorageKey(first, returning, key) {
        return `nullredirect:v1:${key || JSON.stringify([first, returning])}`;
    }

    if (firstUrl !== null || returningUrl !== null) {
        builderPanel.hidden = true;
        router.hidden = false;
        const first = safeHttpUrl(firstUrl || '');
        const returning = safeHttpUrl(returningUrl || '');
        if (!first || !returning) {
            document.getElementById('routerHeading').textContent = 'This redirect link is incomplete.';
            document.getElementById('routerText').textContent = 'Both destinations must be complete http:// or https:// URLs. Ask the person who shared this link to rebuild it.';
            return;
        }

        const storageKey = campaignStorageKey(first, returning, query.get('key') || '');
        try {
            const isReturning = localStorage.getItem(storageKey) === 'visited';
            const destination = isReturning ? returning : first;
            localStorage.setItem(storageKey, 'visited');
            document.getElementById('routerHeading').textContent = isReturning ? 'Welcome back.' : 'A first visit—here you go.';
            document.getElementById('routerText').textContent = `Opening ${new URL(destination).hostname}…`;
            const continueLink = document.getElementById('routerContinue');
            continueLink.href = destination;
            continueLink.hidden = false;
            window.setTimeout(() => location.assign(destination), 900);
        } catch (_) {
            document.getElementById('routerHeading').textContent = 'Browser storage is unavailable.';
            document.getElementById('routerText').textContent = 'This link needs local storage to remember first visits. Enable site storage, then try again.';
            const continueLink = document.getElementById('routerContinue');
            continueLink.href = first;
            continueLink.hidden = false;
        }
        return;
    }

    const form = document.getElementById('redirectForm');
    const error = document.getElementById('redirectError');
    const generatedLink = document.getElementById('generatedLink');
    let activeStorageKey = '';

    form.addEventListener('submit', event => {
        event.preventDefault();
        const first = safeHttpUrl(document.getElementById('url1').value.trim());
        const returning = safeHttpUrl(document.getElementById('url2').value.trim());
        if (!first || !returning) {
            error.textContent = 'Both destinations need complete http:// or https:// URLs.';
            error.hidden = false;
            return;
        }
        const campaignKey = document.getElementById('campaignKey').value.trim();
        const params = new URLSearchParams({ url1: first, url2: returning });
        if (campaignKey) params.set('key', campaignKey);
        generatedLink.value = new URL(`${location.pathname}?${params}`, location.origin).href;
        activeStorageKey = campaignStorageKey(first, returning, campaignKey);
        document.getElementById('testLink').href = generatedLink.value;
        document.getElementById('result').hidden = false;
        document.getElementById('copyStatus').textContent = '';
        error.hidden = true;
    });

    document.getElementById('copyLink').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(generatedLink.value);
            document.getElementById('copyStatus').textContent = 'Link copied.';
        } catch (_) {
            generatedLink.select();
            document.getElementById('copyStatus').textContent = 'Clipboard access was blocked. Select and copy the link above.';
        }
    });

    document.getElementById('resetCampaign').addEventListener('click', () => {
        if (!activeStorageKey) return;
        try {
            localStorage.removeItem(activeStorageKey);
            document.getElementById('copyStatus').textContent = 'This browser is ready to count as a first visit again.';
        } catch (_) {
            document.getElementById('copyStatus').textContent = 'Could not reset this browser’s saved campaign state.';
        }
    });
})();
