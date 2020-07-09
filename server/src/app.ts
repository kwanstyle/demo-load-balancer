import express from 'express';
import body from 'body-parser';

const app = express();
app.use(body.json());

const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Error: Invalid parameters');
    process.exit();
} else if (Number.isNaN(Number(args[1]))) {
    console.error('Error: Invalid port number');
    process.exit();
}
const id = args[0];
const port = args[1];

app.get('*', (req: express.Request, res: express.Response): void => {
    res.send(`Request received at server: ${id}`);
});

app.listen(port, () => console.log(`Test server is listening at localhost:${port}`));
