// Worker entry-point. Route /api/* vers nos handlers, sinon fallback vers les assets statiques (epiceries/).
import { onRequestPost as leadHandler } from '../functions/api/lead.js';
import { onRequestGet as downloadHandler } from '../functions/api/download.js';
import { onRequestPost as contactHandler } from '../functions/api/contact.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // API routing
    if (url.pathname === '/api/lead' && request.method === 'POST') {
      return leadHandler({ request, env, ctx });
    }
    if (url.pathname === '/api/download' && request.method === 'GET') {
      return downloadHandler({ request, env, ctx });
    }
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return contactHandler({ request, env, ctx });
    }

    // Tout le reste → assets statiques (servis automatiquement par le binding ASSETS)
    return env.ASSETS.fetch(request);
  },
};
