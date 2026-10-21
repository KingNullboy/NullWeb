(() => {
    const patternInput = document.getElementById('patternInput');
    const builder = document.getElementById('builder');
    const builderInput = document.getElementById('builderInput');
    const preview = document.getElementById('patternPreview');
    const sample = document.getElementById('sample');
    const flags = document.getElementById('flags');
    const output = document.getElementById('output');
    const count = document.getElementById('matchCount');
    const error = document.getElementById('regexError');
    const escapePattern = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapeHtml = value => value.replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));

    function update() {
        const pattern = patternInput.value;
        preview.textContent = pattern || 'Your pattern will appear here.';
        error.hidden = true;
        if (!pattern) {
            count.textContent = '0 matches';
            output.textContent = 'Enter a pattern and sample text to see matches.';
            return;
        }

        try {
            const regex = new RegExp(pattern, flags.value);
            const matches = [];
            let match;
            do {
                match = regex.exec(sample.value);
                if (!match) break;
                matches.push({ index: match.index, text: match[0] });
                if (!regex.global && !regex.sticky) break;
                if (match[0] === '') regex.lastIndex += 1;
            } while (regex.lastIndex <= sample.value.length);

            count.textContent = `${matches.length} match${matches.length === 1 ? '' : 'es'}`;
            if (!sample.value) {
                output.textContent = 'Add sample text to see matches.';
                return;
            }
            if (!matches.length) {
                output.textContent = 'No matches.';
                return;
            }

            let html = '';
            let cursor = 0;
            matches.forEach(({ index, text }) => {
                html += escapeHtml(sample.value.slice(cursor, index));
                html += `<mark>${escapeHtml(text) || '&#8203;'}</mark>`;
                cursor = index + text.length;
            });
            output.innerHTML = `${html}${escapeHtml(sample.value.slice(cursor))}`;
        } catch (exception) {
            count.textContent = 'Invalid pattern';
            output.textContent = exception.message;
            error.textContent = `Check the pattern or flags: ${exception.message}`;
            error.hidden = false;
        }
    }

    document.getElementById('addElement').addEventListener('click', () => {
        const value = builderInput.value;
        const additions = {
            literal: escapePattern(value), digit: '\\d', word: '\\w', whitespace: '\\s',
            any: '.', start: '^', end: '$', optional: '?', zeroOrMore: '*',
            oneOrMore: '+', group: `(${escapePattern(value)})`, or: '|'
        };
        if ((builder.value === 'literal' || builder.value === 'group') && !value) {
            builderInput.focus();
            return;
        }
        patternInput.value += additions[builder.value];
        builderInput.value = '';
        patternInput.focus();
        update();
    });
    document.getElementById('clearPattern').addEventListener('click', () => {
        patternInput.value = '';
        update();
        patternInput.focus();
    });
    [patternInput, sample, flags].forEach(element => element.addEventListener('input', update));
    update();
})();
