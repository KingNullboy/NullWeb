document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const subsList = document.getElementById('subsList');

    // --- 1. LOCAL FILE DIRECTORY ---
    // Manually maintain the list of .html files present in your socialmedia folder
    const localSubs = [
        'index',
        'subs',
        'info',
        'potatosociety',
        'coding',
        'gaming'
    ];

    // --- 2. Load Subs from Local List ---
    function loadDynamicSubs() {
        if (!subsList) return;

        subsList.innerHTML = localSubs.map(sub => {
            const displayName = sub.toUpperCase();
            const link = `${sub}.html`;
            
            return `
                <button class="navbtn-styled" onclick="location.href='${link}'">
                    [ ${displayName} ]
                </button>`;
        }).join('');
    }

    // --- 3. Local Search Logic ---
    // This now searches the file names and your local post API (if still desired)
    async function performSearch() {
        const query = searchBar.value.trim().toLowerCase();
        if (query.length < 2) return;

        searchResults.innerHTML = '<p>Searching sectors...</p>';

        // Filter the localSubs array for matches
        const matchedSubs = localSubs.filter(sub => sub.includes(query));

        if (matchedSubs.length > 0) {
            searchResults.innerHTML = '<ul class="results-list">' + 
                matchedSubs.map(sub => `
                    <li>
                        <a href="${sub}.html">
                            <span style="border: 1px solid white; padding: 2px 5px; border-radius: 5px;">
                                GOTO: ${sub.toUpperCase()}
                            </span>
                        </a>
                    </li>`).join('') + '</ul>';
        } else {
            searchResults.innerHTML = `<p>No local sector found for "${query}".</p>`;
        }
    }

    // Initialize
    loadDynamicSubs();
    
    if (searchButton) searchButton.addEventListener('click', performSearch);
    if (searchBar) {
        searchBar.addEventListener('keypress', (e) => { 
            if (e.key === 'Enter') performSearch(); 
        });
    }
});
