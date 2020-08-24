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

const getRandom = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
let conn: number = getRandom(0, 10);

app.get('*', (req: express.Request, res: express.Response): void => {
    conn++;
    res.set('conn-count', conn.toString());
    res.send(`Request received at server: ${id}`);
    setTimeout(() => {
        conn--;
    }, getRandom(0, 10) * 1000);
});

app.listen(port, () => console.log(`Test server is listening at localhost:${port}`));
