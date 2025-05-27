// View Counter Cloudflare Worker
export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    // key = slug, e.g., /blog/test3 → blog/test3
    const key = pathname.replace(/^\/+/, '');
    const count = (await env.VIEW_COUNTER.get(key, "text")) || 0;
    const newCount = parseInt(count) + 1;
    await env.VIEW_COUNTER.put(key, newCount.toString());

    // Add CORS headers
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };

    return new Response(JSON.stringify({ views: newCount }), { headers });
  }
};
