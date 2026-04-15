const express = require('express');
const weatherHandler = require('./api/handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Montamos el handler generado en el servidor base
app.use(weatherHandler);

app.listen(port, () => {
    console.log(`Servidor de desarrollo seguro ON en http://localhost:${port}`);
});
