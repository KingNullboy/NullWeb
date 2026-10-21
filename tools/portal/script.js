(() => {
    const form = document.getElementById('portalForm');
    const input = document.getElementById('urlInput');
    const error = document.getElementById('portalError');
    const result = document.getElementById('portalResult');

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
            const portalTab = window.open('about:blank', '_blank');
            if (!portalTab) {
                error.textContent = 'Your browser blocked the new tab. Allow pop-ups for this site, then try again.';
                error.hidden = false;
                return;
            }

            const style = portalTab.document.createElement('style');
            style.textContent = 'html,body{width:100%;height:100%;margin:0;background:#111;overflow:hidden}iframe{display:block;width:100%;height:100%;border:0}';
            const frame = portalTab.document.createElement('iframe');
            frame.title = `Portal view of ${url.hostname}`;
            frame.referrerPolicy = 'no-referrer';
            frame.allowFullscreen = true;
            frame.src = url.href;
            portalTab.document.title = `NullPortal - ${url.hostname}`;
            portalTab.document.head.append(style);
            portalTab.document.body.replaceChildren(frame);
            portalTab.opener = null;

            input.value = url.href;
            error.hidden = true;
            document.getElementById('portalResultTitle').textContent = `${url.hostname} opened in a blank tab.`;
            document.getElementById('portalResultText').textContent = 'The address bar stays on about:blank while the site loads inside the tab.';
            result.hidden = false;
        } catch (_) {
            error.textContent = 'Could not create the blank portal tab. Check your browser’s pop-up settings and try again.';
            error.hidden = false;
        }
    });
})();
