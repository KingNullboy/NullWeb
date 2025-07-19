document.addEventListener('DOMContentLoaded', function() {
    // Check if the current page is 'subs.html'
    if (window.location.href === window.location.protocol + "//" + document.domain + "/socialmedia/subs.html" || window.location.href === window.location.protocol + "//" + document.domain + "/socialmedia/subs") {
        // Select all the nav buttons
        const navButtons = document.querySelectorAll('#navbtn');

        // Loop through each nav button and set the width style
        navButtons.forEach(button => {
            button.style.width = '90px'; // Adjust the width as needed
        });
    }

    // Get the elements from the DOM
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    TOKEN = CryptoJS.AES.decrypt('U2FsdGVkX1+COHsM+2s4JjvbAzYWdSq/kQhroxYQhXan2jJsBQG1GMka+VLu18bXJUTpta2zGaARlwA2jrLMQOl2TAw1F7mHpQjrWelpyRkJVYdne/v9k5R1jjHvQzHPX/6Z4ypKjQvUnRvBDid6JQ==', localStorage.getItem('auth'));

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

            // Filter for only HTML files (assuming they represent posts) and exclude the unwanted files
            const excludedFiles = ['login.html', 'subs.html', 'info.html'];
            const htmlFiles = files.filter(file => file.name.endsWith('.html') && !excludedFiles.includes(file.name));

            // Extract post titles and article IDs from the HTML files
            const posts = [];

            for (let file of htmlFiles) {
                const fileResponse = await fetch(file.download_url);
                const fileContent = await fileResponse.text();

                // Use DOMParser to parse the HTML content
                const parser = new DOMParser();
                const doc = parser.parseFromString(fileContent, 'text/html');

                // Select all <h2> elements inside <article> tags (assuming titles are inside <h2> tags)
                const h2Tags = doc.querySelectorAll('article h2');

                h2Tags.forEach(h2 => {
                    const article = h2.closest('article');
                    const postTitle = h2.textContent; // Post title from <h2>
                    const articleId = article.id; // Article ID

                    posts.push({
                        title: postTitle,
                        articleId: articleId,
                        file: file.name // File name to generate the link
                    });
                });
            }

            return posts;
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
            const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query));
            
            // Display the search results
            console.log('Filtered Posts:', filteredPosts);

            if (filteredPosts.length > 0) {
                searchResults.innerHTML = '<ul>' + filteredPosts.map(post => {
                    const postLink = window.location.protocol + "//" + document.domain + "/socialmedia/" + post.file + "#" + post.articleId;
                    return `<li><a href="${postLink}" target="_blank">${post.title}</a></li>`;
                }).join('') + '</ul>';
            } else {
                searchResults.innerHTML = '<p>No posts found</p>';
            }
        } else {
            searchResults.innerHTML = ''; // Clear search results if input is empty
        }
    });
});