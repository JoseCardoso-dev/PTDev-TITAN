const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let last_message = '';

app.post('/message', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Obrigatorio o envio da menssagem.' });
    }

    last_message = message;
    res.status(200).json({ message: 'Menssagem salva!' });
});

app.get('/', (req, res) => {
    if (!last_message) {
        return res.status(404).json({ error: 'Sem menssagem!!' });
    }

    res.status(200).json({ last_message });
});

app.listen(PORT, () => {
    console.log(`Server on!!!`);
});
