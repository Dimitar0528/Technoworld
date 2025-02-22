import express from 'express'; import compression from 'compression'; import { handler as ssrHandler } from './dist/server/entry.mjs';
import cors from 'cors'; import fs from 'fs'; import https from 'https'; import { Server } from 'socket.io';
const app = express();
const port = 3000;
const options = { key: fs.readFileSync('./ssl/key.pem'), cert: fs.readFileSync('./ssl/cert.pem') }
const sslServer = https.createServer(options, app);
const io = new Server(sslServer);
io.on('connection', socket => { socket.on('chat message', (msg) => { io.emit('chat message', msg); }); });
const disableCacheRoutes = ['/products/wishlist', '/products/cart', '/', '/auctions/auctions', '/auctions/getAuction/:UUID',
    '/auctions/editAuction/:UUID', '/products/editProduct/:UUID'];
app.use((req, res, next) => {
    const shouldDisableCache = disableCacheRoutes.some(route => {
        if (route.includes(':UUID')) {
            const regex = new RegExp(route.replace(':UUID', '([a-zA-Z0-9-]+)'));
            return regex.test(req.url);
        } else {
            return route === req.url;
        }
    });
    if (shouldDisableCache) {
        res.setHeader('Cache-Control', 'no-cache');
    } else {
        res.setHeader('Cache-Control', 'max-age=3600, must-revalidate');
    }
    next();
});
app.use(compression({ level: 9 }));
app.use(express.static('dist/client/', { maxAge: 2629800000 }));
app.use(ssrHandler);
app.use(cors())
app.use(express.json());
sslServer.listen(port, () => { console.log(`Server started on https://localhost:${port}`); });
