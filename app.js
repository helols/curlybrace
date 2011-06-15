
/**
 * Module dependencies.
 */

var express = require('express')
  , everyauth = require('./utils/everyauth')
  , app = module.exports = express.createServer();

var constant = {
   siteName: '{Curlybrace}'
}

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'htuayreve'}));
  app.use(everyauth.middleware());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res){
  res.render('index', {
    title: constant.siteName,
    siteName: constant.siteName
  });
});

app.get('/question/form', function(req, res){
  res.render('question-form', {
    title: constant.siteName + ' :: ' + '질문하기',
    siteName: constant.siteName
  });
});

app.get('/question/*', function(req, res){
  res.render('question', {
    title: constant.siteName + ' :: ' + '질문제목',
    siteName: constant.siteName
  });
});

app.get('/join', function(req, res){
  res.render('join-form', {
    title: constant.siteName + ' :: ' + '가입',
    siteName: constant.siteName
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  everyauth.helpExpress(app);
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
