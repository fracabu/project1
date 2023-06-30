const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('ciao nella home page!');
});

const port = 3000; // Scegli una porta per il server
app.listen(port, () => {
    console.log(`Server Express in esecuzione sulla porta ${port}`);
});


