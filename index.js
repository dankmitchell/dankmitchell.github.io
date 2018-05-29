'use strict';

var express = require('express'),
    sass    = require('node-sass'),
    autoprefixer = require('express-autoprefixer'),
    sassMiddleware = require('node-sass-middleware');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(
  autoprefixer({
    browsers: 'last 2 versions',
    cascade: false
  })
);

app.use(
  sassMiddleware({
    src: __dirname + '/sass',
    dest: __dirname + '/public/stylesheets',
    prefix:  '/stylesheets',
    debug: true,
  })
);

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
