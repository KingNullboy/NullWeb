if (window.navigator.standalone === undefined) {
    // This page isn't in standalone mode (it’s in Safari)
    window.location.href = window.location.href; // Reload the page in a way that forces full-screen behavior
  }