document.addEventListener('DOMContentLoaded', function() {
    // Get the elements from the DOM
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    // GitHub API token (Ensure you are securely storing and fetching this token)
    const p1 = "github_pat_11BPPK76Y0dNfzx1aglxpH_zEe2p6OqcE1G8F34";
    const p2 = "o2NRwVEeP19fQAQO8QQ1fZ4hDRKHAMKGA5QRDD2sk8Z";
    const TOKEN = p1 + p2;

    // GitHub API URL for fetching the file contents
    const GITHUB_API_URL = "https://api.github.com/repos/nullmedia-social/NullWeb/contents/socialmedia/";

    // Function to fetch all post titles dynamically from GitHub
    const getAllPostTitles = async () => {
        try {
            const response = await fetch(GITHUB_API_URL, {
                headers: {
                    "Authorization": "token " + TOKEN
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch files from GitHub.");
            }

            const files = await response.json();

            // Filter for only HTML files (assuming they represent posts)
            const htmlFiles = files.filter(file => file.name.endsWith('.html'));

            // Extract post titles from the HTML files
            const postTitles = [];

            for (let file of htmlFiles) {
                const fileResponse = await fetch(file.download_url);
                const fileContent = await fileResponse.text();

                // Use DOMParser to parse the HTML content
                const parser = new DOMParser();
                const doc = parser.parseFromString(fileContent, 'text/html');

                // Select all <h2> elements inside <article> tags (assuming titles are inside <h2> tags)
                const h2Tags = doc.querySelectorAll('article h2');

                h2Tags.forEach(h2 => {
                    postTitles.push(h2.textContent); // Get the text content of each <h2>
                });
            }

            return postTitles;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    // Event listener for the search button
    searchButton.addEventListener('click', async function() {
        const query = searchBar.value.toLowerCase();
        
        if (query.length > 0) {
            // Get the post titles dynamically from GitHub
            const posts = await getAllPostTitles();
            
            // Log posts for debugging
            console.log('Fetched Post Titles:', posts);

            // Filter the posts based on the search query
            const filteredPosts = posts.filter(post => post.toLowerCase().includes(query));
            
            // Display the search results
            console.log('Filtered Posts:', filteredPosts);

            if (filteredPosts.length > 0) {
                searchResults.innerHTML = '<ul>' + filteredPosts.map(post => `<li>${post}</li>`).join('') + '</ul>';
            } else {
                searchResults.innerHTML = '<p>No posts found</p>';
            }
        } else {
            searchResults.innerHTML = ''; // Clear search results if input is empty
        }
    });
});