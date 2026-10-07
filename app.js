import express from 'express';
import pool from './db/pool.js';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {title:'ホーム'});
});

app.get('/about', (req, res) => {
    res.render('about', {title:'Earchiveについて'});
});

app.get('/songs', async(req, res) => {
    const [songs] = await pool.query(
        'SELECT id, title, artist_name FROM songs ORDER BY id DESC'
    );
    res.render('songs/index', {title: '曲一覧', songs});
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} is running`);
});