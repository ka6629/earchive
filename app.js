import express from 'express';

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

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} is running`);
});