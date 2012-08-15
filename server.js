require('sugar');

var dserver = require('./dserver'),
    drouter = require('./drouter'),
    util    = require('util'),
    url     = require('url'),
    port    = process.env.PORT || 8888;

var router = new drouter();
var server = dserver(router, port);

router.get('/posts', function (req, res) {
  server.renderJade('posts/index', req, res);
});

router.get('/users/\\S+', function (req, res) {
  var id = url.parse(req.url, true).pathname.split('/').last();
  
  // Set local variables for view
  locals = {
    id: id
  };
  server.renderJade('users/view', req, res, locals);
});

router.get('/login', function (req, res) {
  res.end('This is a get request to /login');
});

router.post('/login', function (req, res) {
  res.end('This is a post request to /login');
});