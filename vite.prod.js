const { build } = require('vite');

const start = Date.now();

;(async () => {
  await build({
    mode: 'production',
    build: {
      outDir: 'build',
    }
  });
})().then(() => {
  console.log(`Done in ${Date.now() - start}ms`);
});