import esbuild from 'esbuild';
import fsext from 'fs-extra';

fsext.removeSync(new URL('../../build', import.meta.url).pathname);
fsext.ensureDirSync(new URL('../../build', import.meta.url).pathname);

esbuild.build({
    bundle: true,
    entryPoints: [new URL('../frontend/webui/app.tsx', import.meta.url).pathname],
    external: ['*.ttf', '*.jpg'],
    format: 'esm',
    loader: {
        '.ttf': 'file',
    },
    minify: false,
    outdir: 'build',
    sourcemap: 'inline',
    splitting: true,
    assetNames: '[name]',
    chunkNames: 'dev-[name]-[hash]',
    color: true,
    logLevel: 'debug',
    watch: true,
});