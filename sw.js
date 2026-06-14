// Lilydale Bowmen — Service Worker v3
// Cache-first for app shell, network-first with cache fallback for CDN assets.

const CACHE_NAME = 'lb-archery-v3';

// Core assets — cached on install, served instantly offline
const CORE_ASSETS = [
  './',
  './index.html',
];

// CDN assets — cached on first fetch, served from cache if network unavailable
const CDN_ASSETS = [
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.108.1/dist/umd/supabase.min.js',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=Outfit:wght@300;400;500;600&display=swap',
];

// ── Install — cache all core assets ─────────────────────────────────────────
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // Cache core assets — must succeed
      return cache.addAll(CORE_ASSETS.map(function(url) {
        return new Request(url, { cache: 'reload' });
      })).then(function() {
        // Cache CDN assets — best effort, failures silently ignored
        return Promise.allSettled(
          CDN_ASSETS.map(function(url) {
            return cache.add(new Request(url, { cache: 'reload' }));
          })
        );
      });
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// ── Activate — remove old caches ────────────────────────────────────────────
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key)   { return caches.delete(key); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// ── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  var url = event.request.url;

  // Cache-first for the app HTML — serve instantly, update in background
  var isAppShell = url.endsWith('/') ||
                   url.endsWith('/index.html') ||
                   url.includes('glensanders-gdev.github.io/LilydaleBowmen');

  if (isAppShell) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(cached) {
          // Fetch fresh copy in background and update cache
          var fetchPromise = fetch(event.request).then(function(response) {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(function() {});

          // Return cached immediately if available, otherwise wait for network
          return cached || fetchPromise;
        });
      })
    );
    return;
  }

  // Network-first with cache fallback for CDN assets (Supabase, Google Fonts)
  var isCDN = url.includes('jsdelivr.net') || url.includes('googleapis.com') || url.includes('gstatic.com');

  if (isCDN) {
    event.respondWith(
      fetch(event.request).then(function(response) {
        if (response.ok) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function() {
        return caches.match(event.request);
      })
    );
    return;
  }

  // Default: network with cache fallback
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
