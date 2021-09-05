# This is a simple website using graphql

website: [白眉居](http://www.eyebrow.top)(so slow for now, no time to optimize)

## run
- `npm install`
- `npm run vite`

~~This project is a practice project for me to learn graphql~~ This project will be my website, which need a lot improvement using `react` `express` `apollo-graphql`.

I remove the backend code for now, because i need improve the messy code, and i will add a docker next time.

## build tool

This project can use three build tools, the scripts in `package.json` will tell you how to start it.

And I need to say, you need change the `public/esbuild-index.html` to `public/index.html` when you want to use `npm run esbuild` and change it back when run `npm run vite`, that's because vite will find the `index.html` file as entry file. 