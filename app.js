import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Earchive!');
});

app.get('/about', (req, res) => {
    res.send('Earchiveは聞いた音楽を記録するアプリです' );
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} is running`);
});