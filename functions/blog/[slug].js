export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  let slug = url.pathname.split('/').pop();
  // Remove .html extension if present
  if (slug && slug.endsWith('.html')) {
    slug = slug.replace('.html', '');
  }
  const baseUrl = url.origin;
  const templateResponse = await fetch(`${baseUrl}/blog-post.html`);
  if (!templateResponse.ok) return new Response('Template not found', { status: 404 });
  let html = await templateResponse.text();
  const slugScript = `<script>window.BLOG_SLUG = '${slug}';</script>`;
  html = html.replace('</head>', `${slugScript}</head>`);
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
