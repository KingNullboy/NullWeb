self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/proxy/')) {
    const encoded = url.pathname.split('/proxy/')[1];
    let target;
    try {
      target = atob(encoded);
    } catch (e) {
      event.respondWith(new Response('Bad encoding', { status: 400 }));
      return;
    }
    event.respondWith(fetch(target, {
      method: event.request.method,
      headers: event.request.headers,
      body: event.request.body,
      redirect: 'follow'
    }));
  }
});