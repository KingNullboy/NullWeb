(function() {
    let newTab = window.open('about:blank'); // Open a new about:blank tab
    newTab.blur(); // Make sure the new tab doesn't steal focus
    newTab.document.write('<html><head><script>fetch("https://www.nullweb.byethost6.com/gxmes/bookmarklets.html").then(r=>{if(!r.ok)throw new Error("Failed to fetch bookmarklets.");return r.text();}).then(h=>{window.opener.postMessage({data:h},"*");window.close();}).catch(e=>{window.opener.postMessage({data:"Error: "+e.message},"*");window.close();});</script></head><body></body></html>'); // Fetch the data and send it back to the opener tab
    window.focus(); // Focus back to the main tab
    let searchDone = false;

    // Listen for the message from the new tab
    window.addEventListener("message", function(e) {
        if (e.source === window && e.data) {
            let d = new DOMParser().parseFromString(e.data, "text/html");
            let a = [...d.querySelectorAll("a[href^='javascript:']")].map(function(l) {
                let code = l.href.slice(11); // Get the bookmarklet code
                try {
                    code = decodeURIComponent(code);
                } catch (e) {
                    return null; // Skip if there's an error decoding
                }
                return { title: l.textContent.trim(), code: code }; // Return the bookmarklet data
            }).filter(Boolean);

            let pages = Math.ceil(a.length / 20); // Split the results into pages
            for (let i = 0; i < pages; i++) {
                let page = a.slice(i * 20, (i + 1) * 20).map(function(b, i2) {
                    return (i * 20 + i2 + 1) + ". " + b.title;
                }).join("\n");
                alert("Available bookmarklets (Page " + (i + 1) + "/" + pages + "): \n\n" + page); // Show available bookmarklets
            }

            if (!searchDone) {
                let s = prompt("Search for a bookmarklet by name:"); // Prompt for search term
                if (!s) {
                    alert("Search cancelled.");
                    return;
                }

                let r = a.reduce(function(acc, b) {
                    let matchScore = b.title.toLowerCase().includes(s.toLowerCase()) ? 1 : 0;
                    if (matchScore > acc.score) return { bookmarklet: b, score: matchScore };
                    return acc;
                }, { score: 0 }).bookmarklet;

                if (!r) {
                    alert("No match found.");
                    return;
                }

                if (confirm("Run \"" + r.title + "\"?")) {
                    eval(r.code); // Execute the bookmarklet code if confirmed
                } else {
                    alert("Cancelled.");
                }
                searchDone = true;
            }
        }
    });
})();