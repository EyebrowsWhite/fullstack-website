import http from 'http';
import fs from 'fs';
import path from 'path';
import { WebTpl } from './template/website-tpl';
import { REACT_ROUTE } from './router/react-router';

const JS_ROUTE:string[] = [];

const ls = fs.readdirSync(path.resolve(__dirname, '../../build'), { withFileTypes: true });

ls.forEach((file) => {
    const fileName = path.basename(file.name);
    const match = fileName.match(/dev-(.*)\.js/);
    if (match) {
        JS_ROUTE.push(`/${fileName}`);
    }
});

const server = http.createServer((request, response) => {
    if (request.url && REACT_ROUTE.includes(request.url)) {
        const tpl = WebTpl();
        response.setHeader('content-type', 'text/html');
        response.statusCode = 200;
        response.end(tpl);
    } else if (request.url === '/logo.svg') {
        const ico = fs.readFileSync(path.resolve(__dirname, '../../assets/icon/logo.svg'));
        response.statusCode = 200;
        response.setHeader('content-type', 'image/svg+xml');
        response.end(ico);
    } else if (request.url === '/bundle.js') {
        const js = fs.readFileSync(path.resolve(__dirname, '../../build/app.js'));
        response.statusCode = 200;
        response.setHeader('content-type', 'text/javascript');
        response.end(js);
    } else if (request.url && JS_ROUTE.includes(request.url)) {
        const js = fs.readFileSync(path.resolve(__dirname, `../../build${request.url}`));
        response.statusCode = 200;
        response.setHeader('content-type', 'text/javascript');
        response.end(js);
    } else if (request.url === '/style.css') {
        const css = fs.readFileSync(path.resolve(__dirname, '../../build/app.css'));
        response.statusCode = 200;
        response.setHeader('content-type', 'text/css');
        response.end(css);
    } else if (request.url === '/assets/font/Righteous-Regular.ttf') {
        const font = fs.readFileSync(path.resolve(__dirname, '../../assets/font/Righteous-Regular.ttf'));
        response.statusCode = 200;
        response.setHeader('content-type', 'font/ttf');
        response.end(font);
    } else if (request.url === '/assets/font/WindSong-Regular.ttf') {
        const font = fs.readFileSync(path.resolve(__dirname, '../../assets/font/WindSong-Regular.ttf'));
        response.statusCode = 200;
        response.setHeader('content-type', 'font/ttf');
        response.end(font);
    } else if (request.url === '/assets/font/Rosario-VariableFont_wght.ttf') {
        const font = fs.readFileSync(path.resolve(__dirname, '../../assets/font/Rosario-VariableFont_wght.ttf'));
        response.statusCode = 200;
        response.setHeader('content-type', 'font/ttf');
        response.end(font);
    } else if (request.url === '/assets/banner/banner.jpg') {
        const banner = fs.readFileSync(path.resolve(__dirname, '../../assets/banner/banner.jpg'));
        response.statusCode = 200;
        response.setHeader('content-type', 'image/jpg');
        response.end(banner);
    }
});

server.listen(5000, () => {
    console.log('http://localhost:5000');
});