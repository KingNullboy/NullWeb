document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        const buttons = document.querySelectorAll("button");

        buttons.forEach(button => {
            const text = button.textContent.toLowerCase();
            if (text.includes(filter)) {
                button.style.display = "block";
            } else {
                button.style.display = "none";
            }
        });
    });
});