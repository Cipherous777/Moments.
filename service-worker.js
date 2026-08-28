const CACHE_NAME = 'moments-static-v2'; // bump this any time STATIC_ASSETS content changes
const STATIC_ASSETS = [
  '/home.html', '/compose.html', '/monami.html',
  '/profile.html', '/upgrade.html', '/identity-match.html', '/login.html'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS)));
  self.skipWaiting(); // activate the new service worker immediately instead of waiting for all tabs to close
});

self.addEventListener('activate', e => {
  // Delete any old cache versions left over from previous deploys
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // take control of open tabs right away
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Never cache Firestore, Firebase auth, socket.io, or Paddle — always hit network
  if (url.hostname.includes('firestore') ||
      url.hostname.includes('googleapis') ||
      url.hostname.includes('gstatic') ||
      url.hostname.includes('paddle.com') ||
      url.pathname.includes('socket.io')) {
    return;
  }

  // Network-first for HTML pages/navigations, so edits show up immediately.
  // Falls back to the cached copy only if the network request fails.
  if (e.request.mode === 'navigate' || e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, resClone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first for everything else (static assets like icons, fonts, etc.)
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});