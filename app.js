var express = require('express'),
    title = require('./routes/title'),
    http = require('http'),
    path = require('path'),
    app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // CORS
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    req.method === 'OPTIONS' ? res.send(200) : next();
  });
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

app.post('/titles', title.list);
app.get('/manifest.webapp', function (req, res) {
  res.type('application/x-web-app-manifest+json');
  res.sendfile('public/manifest.webapp');
});

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
