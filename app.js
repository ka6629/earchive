import express from 'express';
import pool from './db/pool.js';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

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

app.get('/songs/new', (req, res) => {
    res.render('songs/new', {title: '曲を登録'});
});

app.post('/songs', async (req, res) => {
    const { title, artist_name } = req.body;
    const userId = 1; // 仮の値。Step 7でログイン中のユーザーに変える

    await pool.query(
        'INSERT INTO songs (title, artist_name, user_id) VALUES (?, ?, ?)',
        [title, artist_name, userId]
    );
    res.redirect('/songs');
});

app.get('/songs/:id', async (req, res) => {
    const{ id } = req.params;
    const [rows] = await pool.query('SELECT id, title, artist_name, created_at FROM songs WHERE id = ?', [id]);
    if(rows.length === 0){
        return res.status(404).send('曲が見つかりません');
    }
    const song = rows[0];
    res.render('songs/show', {title: song.title,song});
});

app.get('/songs/:id/edit', async (req, res) => {
    const{ id } = req.params;
    const [rows] = await pool.query('SELECT id, title, artist_name FROM songs WHERE id = ?', [id]);
    if(rows.length === 0){
        return res.status(404).send('曲が見つかりません');
    }
    const song = rows[0];
    res.render('songs/edit', {title: '曲を編集', song});
});

app.post('/songs/:id/update', async (req, res) => {
    const { id } = req.params;
    const { title, artist_name } = req.body;
    await pool.query('UPDATE songs SET title = ?, artist_name = ? WHERE id = ?',
        [title, artist_name, id]
    );
    res.redirect(`/songs/${id}`);
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} is running`);
});