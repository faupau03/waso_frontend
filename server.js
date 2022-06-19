const express = require('express');
const app = express();

app.set("trust proxy", "172.18.0.10");





app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/user', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})





const port = 80;
app.listen(port, () => {
    console.log(`App listening on port ${port}'`);
});