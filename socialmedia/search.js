document.getElementById("searchButton").addEventListener("click", function() {
    const searchQuery = document.getElementById("searchBar").value.toLowerCase(); // Get the search query and convert to lowercase
    const resultsContainer = document.getElementById("searchResults"); // Container to display results

    // Check if the search bar is empty
    if (!searchQuery.trim()) {
        resultsContainer.innerHTML = "<p>Please enter a search term.</p>";
        return;
    }

    // List of subpages to search through
    const subPages = ['index.html', 'politics.html']; // Add more subpages here as necessary
    let searchResults = '';
    let processedPages = 0;

    // Function to fetch and process each subpage
    subPages.forEach(subPage => {
        fetch(subPage)
            .then(response => response.text())
            .then(data => {
                // Parse the page content
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const posts = doc.querySelectorAll('article'); // Get all posts (articles)

                // Check each post's title for the search query
                posts.forEach(post => {
                    const title = post.querySelector('h2') ? post.querySelector('h2').textContent : "";
                    if (title.toLowerCase().includes(searchQuery)) {
                        searchResults += `<p><strong>Post found in ${subPage}:</strong> ${title}</p>`;
                    }
                });

                // Increment processed pages
                processedPages++;

                // After all pages are processed, update the search results
                if (processedPages === subPages.length) {
                    if (searchResults === '') {
                        resultsContainer.innerHTML = "<p>No posts found for your search.</p>";
                    } else {
                        resultsContainer.innerHTML = searchResults;
                    }
                }
            })
            .catch(error => {
                resultsContainer.innerHTML = "<p>Error fetching subpages.</p>";
                console.error(error);
            });
    });
});