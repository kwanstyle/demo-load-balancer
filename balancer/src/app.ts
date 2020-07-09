import express from 'express';
import body from 'body-parser';
import request from 'request';
import config from './manifest.json';

const app = express();
app.use(body.json());

const args = process.argv.slice(2);
if (args.length != 1) {
    console.error('Error: Invalid parameters');
} else if (!config.strategies.includes(args[0])) {
    console.error('Error: Invalid strategies of balancing');
}
const port = config.balancer.port;

let count = 0;

//Avoid browser sending an extra request
app.get('/favicon.ico', (req, res) => res.status(204));

app.get('*', (req: express.Request, res: express.Response): void => {
    const url = `${config.servers[count].url}:${config.servers[count].port}`;
    console.log(`Request redirected to ${config.servers[count].id} - ${url}`);
    req.pipe(
        request({ url: url }).on('error', (error) => {
            console.log(`Error: Failed to redirect the request`);
            res.status(500).send(error.message);
        }),
    ).pipe(res);
    count = (count + 1) % config.servers.length;
});

app.listen(port, () => console.log(`Load balancer is listening at localhost:${port}`));
