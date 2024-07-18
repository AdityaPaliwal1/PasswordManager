const express = require('express');
const app = express();
const colors = require('colors');
const cors = require('cors');
const Port = 5000;

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`.yellow.bold);
});

app.get('/', (req, res) => {
    res.send('Server is Live😄');
});