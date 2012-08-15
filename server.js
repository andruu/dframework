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
  locals = {
    id: id
  };
  server.renderJade('users/view', req, res, locals);
});

router.get('/login', function (req, res) {
  res.end('trying to login brah!');
});

router.post('/login', function (req, res) {
  res.end('POSTY: trying to login brah!');
});