const fs = require('fs');
const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>EV2 Frontend</title>
  </head>
  <body>
    <h1>EV2 Frontend (stub)</h1>
    <p>Front-end minimal de prueba.</p>
  </body>
</html>`;

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('Frontend build: dist/index.html created');
