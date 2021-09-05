const http = require('http');
const begin = Date.now();
require('esbuild').serve({
    servedir: 'public',
    host: 'localhost',
}, {
    bundle: true,
    entryPoints: ['src/frontend/webui/app.tsx'],
    format: 'esm',
    loader: {
        '.ttf': 'file',
        '.jpg': 'file'
    },
    minify: false,
    outdir: 'public/js',
    platform: 'browser',
    sourcemap: 'inline',
    splitting: true,
    target: ['es2020'],
    assetNames: '[name]',
    chunkNames: 'dev.[hash]',
    color: true,
    incremental: true,
    logLevel: 'debug',
    publicPath: '/js/',
}).then((server) => {
    const {host, port} = server

    http.createServer((req, res) => {
        const options = {
            hostname: host,
            port: port,
            path: req.url,
            method: req.method,
            headers: req.headers,
        }
        const proxyReq = http.request(options, (proxyRes) => {
            if (proxyRes.statusCode === 404) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>A custom 404 page</h1>');
                return;
            }
            res.writeHead(proxyRes.statusCode || 404, proxyRes.headers);
            proxyRes.pipe(res, { end: true });
        });
        req.pipe(proxyReq, { end: true });
    }).listen(7777);
    console.log(`http://${host}:${7777}`);
    console.log(`ready in ${Date.now() - begin}ms`);
});