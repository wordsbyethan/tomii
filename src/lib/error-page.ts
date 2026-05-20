export function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Something went wrong</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #fffaf2; color: #2b2118; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      main { width: min(92vw, 34rem); text-align: center; padding: 2rem; }
      h1 { margin: 0 0 0.75rem; font-size: clamp(2rem, 7vw, 3.5rem); line-height: 1; }
      p { margin: 0 auto 1.5rem; color: #6d5c4b; line-height: 1.6; }
      .actions { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
      a, button { border-radius: 999px; border: 1px solid #d8b46a; padding: 0.8rem 1.1rem; font: inherit; font-weight: 700; cursor: pointer; text-decoration: none; }
      button { background: #d8b46a; color: #2b2118; }
      a { background: transparent; color: #2b2118; }
    </style>
  </head>
  <body>
    <main>
      <h1>Something went wrong</h1>
      <p>The page had trouble loading. Refresh the page or return home.</p>
      <div class="actions">
        <button onclick="location.reload()">Refresh</button>
        <a href="/">Go home</a>
      </div>
    </main>
  </body>
</html>`;
}