document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const subsList = document.getElementById('subsList');

    let communities = [];

    // --- 1. FETCH FROM JSON ---
    async function loadSubsData() {
        try {
            const response = await fetch('subs.json');
            communities = await response.json();
            displayAllSubs(); // Show them on the page
        } catch (err) {
            console.error("Failed to load subs.json", err);
            if (subsList) subsList.innerHTML = "<p>Error loading sectors.</p>";
        }
    }

    // --- 2. Display the list ---
    function displayAllSubs() {
        if (!subsList) return;
        subsList.innerHTML = communities.map(sub => `
            <button class="headerbtn" onclick="location.href='index.php?sub=${sub[0]}'" style="margin: 5px;">
                ${sub[1]}
            </button>
        `).join('');
    }

    // --- 3. Search Logic ---
    function performSearch() {
        const query = searchBar.value.trim().toLowerCase();
        if (query.length < 1) {
            searchResults.innerHTML = '';
            return;
        }

        const matchedSubs = communities.filter(sub => 
            sub[0].toLowerCase().includes(query) || 
            sub[1].toLowerCase().includes(query)
        );

        if (matchedSubs.length > 0) {
            searchResults.innerHTML = '<ul style="list-style: none; padding: 0; margin-top: 15px;">' + 
                matchedSubs.map(sub => `
                    <li style="margin-bottom: 10px;">
                        <a href="index.php?sub=${sub[0]}" style="text-decoration: none; color: inherit;">
                            <span class="headerbtn" style="display: inline-block; width: 100%; text-align: left;">
                                GOTO: ${sub[1].toUpperCase()}
                            </span>
                        </a>
                    </li>`).join('') + '</ul>';
        } else {
            searchResults.innerHTML = `<p style="color: #ff4444;">No sector found.</p>`;
        }
    }

    // Initialize
    loadSubsData();
    
    if (searchButton) searchButton.addEventListener('click', performSearch);
    if (searchBar) {
        searchBar.addEventListener('input', () => {
            if (searchBar.value.length === 0) searchResults.innerHTML = '';
        });
        searchBar.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });
    }
});