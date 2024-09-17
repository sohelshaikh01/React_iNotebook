import connectToMongo from './db.js';
import express from 'express';

connectToMongo();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/api/v1', (req, res) => {
    res.send("Hello world 1");
});

app.get('/api/v2', (req, res) => {
    res.send("Hello world 2");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
