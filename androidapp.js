let deferredPrompt;
const addBtn = document.getElementById('installButtonAndroid'); // You can use any element as a button to trigger the prompt

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default install prompt from showing
  e.preventDefault();
  deferredPrompt = e;

  // Show your custom "Add to Home Screen" button
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', () => {
    // Show the install prompt
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});