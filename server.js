const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// partial is a partial piece of ur website that you can reuse throughout ur whole code
// we run terminal like this: nodemon server.js -e js, hbs
hbs.registerPartials(__dirname + '/views/partials');

// lets us set express related configurations
app.set('view engine', 'hbs');

// next lets us tell express when our middleware function is done
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  // '\n' starts a new line
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// this will stop everything after it from executing
// we dont call next in this function so nothing after it will execute
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

// dirname stores path to project directory
// it stores path to node-web-server for this project
// this is how we register middleware
app.use(express.static(__dirname + '/public'));

// if we call getCurrentYear anywhere it will return the year
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// request stores info about request coming in like the headers, body, methods made w request
// response has methods available made to us so we can respond to the request
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Raman',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome!'
  });
});

app.get('/about', (req, res) => {
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
