const { response } = require('express');
const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/static', (request, response) => {
    
});

app.listen(3000);

