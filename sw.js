// Simple Service Worker to provide a reliable /api/exams/:id endpoint using local data
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  try {
    const url = new URL(event.request.url);
    // Only intercept requests to the exams API path
    if (url.pathname.startsWith('/api/exams/')) {
      const id = url.pathname.split('/').pop();
      event.respondWith((async () => {
        // Try network first
        try {
          const netResp = await fetch(event.request);
          if (netResp && netResp.ok) return netResp;
        } catch (e) { /* network failed or 404 */ }

        // Fallback to local static JSON file
        try {
          const res = await fetch('/data/exams.json');
          if (!res || !res.ok) throw new Error('Local data not available');
          const all = await res.json();
          if (all && all[id]) {
            return new Response(JSON.stringify(all[id]), { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
        } catch (e) { /* fallback failed */ }

        return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      })());
    }
  } catch (err) {
    // ignore URL parsing errors
  }
});