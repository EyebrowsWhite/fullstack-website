const path = require('path');
const fsext = require('fs-extra');

fsext.removeSync(path.resolve(__dirname, 'build'));
fsext.ensureDirSync(path.resolve(__dirname, 'build'));

require('esbuild').build({
    bundle: true,
    entryPoints: ['src/frontend/webui/app.tsx'],
    format: 'esm',
    loader: {
        '.ttf': 'file',
        '.jpg': 'file'
    },
    minify: false,
    outdir: 'build',
    platform: 'browser',
    sourcemap: 'inline',
    splitting: true,
    target: ['es2020'],
    assetNames: '[name]',
    chunkNames: 'dev.[hash]',
    color: true,
    logLevel: 'debug',
});