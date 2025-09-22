import https from 'node:http';
import fs from 'node:fs/promises';

const server = https.createServer(async (req, res) => {
    let data;
    switch(req.url) {
        case '/':
            data = await fs.readFile('index.html');
            break;
        case '/about':
            data = await fs.readFile('about.html');
            break;
        case '/contact-me':
            data = await fs.readFile('contact-me.html');
            break;
        default:
            data = await fs.readFile('404.html');
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(data);
            return;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
});

server.listen(8080);