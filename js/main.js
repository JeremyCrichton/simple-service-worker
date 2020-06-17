// REGISTER THE SERVICE WORKER

// Make sure sw are supported
if ('serviceWorker' in navigator) {
  // === navigator.serviceWorker
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_pages.js')
      .then(registrationObj =>
        console.log('Service Worker: Registered (Pages)')
      )
      .catch(err => console.log(`Service Worker: Error: ${err}`));
  });
}
