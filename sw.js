/* SGT. RUKA — service worker.
   Caches the game so it plays with no connection. Only same-origin GETs are
   touched: an online score board lives on another host and is left alone, so
   it simply fails and the game falls back to local scores, exactly as it does
   in a browser with no network. */

/* Caches are shared across the whole origin (ulebule.github.io), so every
   app here can see every other app's caches. Only ever delete our own — the
   prefix check is what stops one game from wiping another game's cache. */
const PREFIX  = 'sgt-ruka-';
const VERSION = PREFIX + 'v99';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', e => {{
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
}});

self.addEventListener('activate', e => {{
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== VERSION)
                            .map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
}});

self.addEventListener('fetch', e => {{
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== location.origin) return;

  if (req.mode === 'navigate') {{
    e.respondWith(
      fetch(req)
        .then(res => {{
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put('./index.html', copy)).catch(() => {{}});
          return res;
        }})
        .catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }}

  e.respondWith(
    caches.match(req).then(hit => {{
      const net = fetch(req).then(res => {{
        if (res && res.ok && res.type === 'basic') {{
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {{}});
        }}
        return res;
      }}).catch(() => hit);
      return hit || net;
    }})
  );
}});
