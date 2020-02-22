'use strict';

var express        = require('express'),
    expressLayouts = require('express-ejs-layouts'),
    sass           = require('node-sass'),
    autoprefixer   = require('express-autoprefixer'),
    sassMiddleware = require('node-sass-middleware');

var app = express();
var environment = app.get('env');

app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(expressLayouts);

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

if (environment == 'production') {
  app.all(/.*/, function(req, res, next) {
    var host = req.header("host");
    if (host.match(/^www\..*/i)) {
      next();
    } else {
      res.redirect(301, "https://www." + host + req.url);
    }
  });
}

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/my-story', function(request, response) {
  response.render('pages/my_story');
});

app.get('/work', function(request, response) {
  response.render('pages/work');
});

app.get('/ruby-on-rails', function(request, response) {
  response.render('pages/ruby_on_rails');
});

app.get('/software-development', function(request, response) {
  response.render('pages/software_development');
});

app.get('/web-development', function(request, response) {
  response.render('pages/web_development');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
