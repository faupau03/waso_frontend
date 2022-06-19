const express = require('express');
const app = express();

app.set("trust proxy", "172.18.0.10");





app.use(express.static('dist'));

app.get('/favorites', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/leagues', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/team', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/match', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/club', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/gym', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})





const port = 80;
app.listen(port, () => {
    console.log(`App listening on port ${port}'`);
});