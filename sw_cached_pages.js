/**
 * SERVICE WORKER Option 1
 *  - select individual files to cache
 */

const cacheName = 'v1';

const cacheAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/main.js',
];

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  // Cache our files
  e.waitUntil(
    caches // caches storage API
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');

  // Clean up old caches - delete all caches that aren't the current cache
  // - if you change cache name above (v1), it will cache the new one and delete v1
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  // Check if the live site is available, if not, load the cached site
  // - caches.matc(e.request) <== load from the cache, the files sent an HTTP req for
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
