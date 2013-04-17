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
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

app.post('/titles', title.list);
/*app.get('/manifest.webapp', function (req, res) {
  res.type('application/x-web-app-manifest+json');
  res.sendfile('app/manifest.webapp');
});*/

// install code
app.get('/install.html', function (req, res) {
  res.sendfile('app/install.html');
});
app.get('/package.manifest', function (req, res) {
  res.sendfile('app/package.manifest');
});
app.get('/package.zip', function (req, res) {
  res.sendfile('app/package.zip');
});

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
