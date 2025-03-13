// Dummy array for post titles from different subs (you can replace this with actual data)
const posts = [
    { title: 'General Post about Science', sub: 'General' },
    { title: 'Politics and the Future of America', sub: 'Politics' },
    { title: 'Amazing Movie Reviews', sub: 'General' },
    { title: 'Debate on the Economy', sub: 'Politics' },
    { title: 'NullMedia Site Update', sub: 'General' }
];

// Search function that is triggered as the user types in the search bar
function searchPosts() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    // Filter posts based on the search query
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query));
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // If no posts match the query
    if (filteredPosts.length === 0) {
        resultsContainer.innerHTML = 'No posts found';
        return;
    }
    
    // Display the filtered posts
    filteredPosts.forEach(post => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        resultItem.innerHTML = `<strong>${post.title}</strong> - <em>${post.sub}</em>`;
        
        // You can add a link to each post if needed (adjust URL as necessary)
        resultItem.addEventListener('click', () => {
            window.location.href = `${post.sub}.html`;  // Redirect to the respective sub page
        });
        
        resultsContainer.appendChild(resultItem);
    });
}