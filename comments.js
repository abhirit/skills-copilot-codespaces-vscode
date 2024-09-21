//create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const qs = require('querystring');
const comments = [];
const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url);
    let filePath = path.join(__dirname, urlObj.pathname);
    console.log(filePath)
    if (urlObj.pathname === '/') {
        filePath = path.join(__dirname, 'index.html');
    } else if (urlObj.pathname === '/comment') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                const comment = qs.parse(body);
                comments.push(comment);
                res.end(JSON.stringify(comments));
            });
        }
    }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not Found');
        } else {
            res.end(data);
        }
    });
});
server.listen(3000, () => {
    console.log('Server is running');
});