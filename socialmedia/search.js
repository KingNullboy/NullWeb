document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    async function performSearch() {
        const fullQuery = searchBar.value.trim();
        if (fullQuery.length < 1) {
            searchResults.innerHTML = '';
            return;
        }

        searchResults.innerHTML = '<p style="color: #888;">Executing command...</p>';

        let type = 'all'; 
        let query = fullQuery;

        const commands = {
            '/content ': 'content',
            '/title ': 'title',
            '/sub ': 'sub',
            '/user ': 'user'
        };

        for (const [cmd, cmdType] of Object.entries(commands)) {
            if (fullQuery.startsWith(cmd)) {
                type = cmdType;
                query = fullQuery.replace(cmd, '').trim();
                break;
            }
        }

        try {
            // Corrected to /api/search as requested
            const response = await fetch(`/api/search?type=${type}&q=${encodeURIComponent(query)}&t=${Date.now()}`);
            const results = await response.json();
            
            const data = results.posts || results;
            renderResults(data, type);
        } catch (err) {
            console.error("Search Error:", err);
            searchResults.innerHTML = '<p style="color:red;">Search failed.</p>';
        }
    }

    function renderResults(data, type) {
        if (!data || data.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
            return;
        }

        if (type === 'sub') {
            searchResults.innerHTML = data.map(sub => `
                <button class="headerbtn" style="width:100%; margin-top:5px; text-align:left;" 
                        onclick="location.href='index.php?sub=${sub.slug}'">
                    GOTO: ${sub.display_name.toUpperCase()}
                </button>
            `).join('');
        } else {
            // Added #${post.id} to the URL so the browser jumps to the specific post div
            searchResults.innerHTML = data.map(post => `
                <div style="border-bottom: 1px solid #333; padding: 10px 0; text-align: left;">
                    <a href="index.php?sub=${post.sub}#post-${post.id}" style="text-decoration:none; color:inherit;">
                        <small style="color:var(--border-color, #888);">[${post.sub.toUpperCase()}]</small><br>
                        <strong>${post.title}</strong><br>
                        <span style="font-size:0.8rem; opacity:0.7;">By ${post.author_username}</span>
                    </a>
                </div>
            `).join('');
        }
    }

    if (searchButton) searchButton.addEventListener('click', performSearch);
    if (searchBar) {
        searchBar.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });
        searchBar.addEventListener('input', () => { if (searchBar.value === '') searchResults.innerHTML = ''; });
    }
});