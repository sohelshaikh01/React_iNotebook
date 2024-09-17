import connectToMongo from './db.js';
import express from 'express';
import authRouter from './routes/auth.js';
import notesRouter from './routes/notesAuth.js';

connectToMongo();
const app = express(); // Middleware
const port = 3000;

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
