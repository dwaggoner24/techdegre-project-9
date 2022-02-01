const express = require('express');
const app = express();
const data = require('./data.json');
const { projects } = data;

//middleware

app.set('view engine', 'pug'); //sets up pug

app.use('/static', express.static('public')); //connects the static files in the public folder

//created routes

app.get('/', (req, res) => {
    res.render('index', { projects } )    
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/projects/:id', (req, res, next) => {
    const id = req.params;
    const project = projects[id];

    if (project) {
        res.render('project', project);
    } else {
        next();
    }
});

//listner/host

app.listen(3000, () => {
    console.log('The application is running in localhost:3000');
});


//error handlers
//404 handler in app.js
app.use((req, res, next) => {
    const err = new Error();
    err.message = 'Oops! Page not found';
    err.status = 404;
    next(err);
});

//global error handler
//referenced error handling in express workshop on treehouse
app.use((req, res, next) => {
    if (err.status === 404) {
        res.status(404).render('not-found', err);
    } else {
        err.message = err.message || 'Oops! It looks like something went wrong on the server.'
        res.status(err.status || 500);
        res.render('error', err);
    }
});
