// Define GitHub token (be careful when storing it!)
var p1 = "github_pat_11BPPK76Y0dNfzx1aglxpH_zEe2p6OqcE1G8F34";
var p2 = "o2NRwVEeP19fQAQO8QQ1fZ4hDRKHAMKGA5QRDD2sk8Z";
const TOKEN = p1 + p2;

async function fetchSubpageFiles() {
    const owner = 'nullmedia-social'; // Replace with your GitHub username
    const repo = 'NullWeb';           // Replace with your repo name
    const path = 'socialmedia';       // The directory where the subs are

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
            "Authorization": "token " + TOKEN
        }
    });
    const files = await response.json();

    // Filter out only the .html files
    const htmlFiles = files.filter(file => file.name.endsWith('.html')).map(file => file.download_url);
    return htmlFiles;
}

async function fetchPostTitlesFromPage(pageUrl) {
    try {
        const response = await fetch(pageUrl);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        
        // Get all articles (posts)
        const articles = doc.querySelectorAll('article');
        
        // Extract titles from each article
        const posts = Array.from(articles).map(article => {
            const title = article.querySelector('h2') ? article.querySelector('h2').textContent : 'Untitled Post';
            const postUrl = article.querySelector('a') ? article.querySelector('a').href : pageUrl; // Default to the page URL if no link
            return { title, url: postUrl };
        });
        
        return posts;
    } catch (error) {
        console.error('Error fetching post titles:', error);
        return [];
    }
}

async function fetchAllPosts() {
    const htmlFiles = await fetchSubpageFiles();
    const allPosts = [];

    // Fetch and extract titles from each subpage
    for (let fileUrl of htmlFiles) {
        const posts = await fetchPostTitlesFromPage(fileUrl);
        allPosts.push(...posts);
    }

    return allPosts;
}

function searchPosts(query, posts) {
    const results = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    return results;
}

function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear existing results

    if (results.length === 0) {
        resultsContainer.innerHTML = 'No results found.';
    } else {
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'resultItem';
            resultElement.innerHTML = `<a href="${result.url}">${result.title}</a>`;
            resultsContainer.appendChild(resultElement);
        });
    }
}

// Main search function
async function handleSearch() {
    const query = document.getElementById('searchBar').value;
    const posts = await fetchAllPosts(); // Fetch all posts dynamically
    const results = searchPosts(query, posts);
    displayResults(results);
}

// Add event listener to search bar
document.getElementById('searchBar').addEventListener('input', handleSearch);