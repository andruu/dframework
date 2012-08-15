var http    = require('http'),
    fs      = require('fs'),
    url     = require('url'),
    util    = require('util'),
    clc     = require('cli-color'),
    jade    = require('jade'),
    drender = require('./drender');

var log = function (message) {
  console.log(Date.create().format('{yyyy}-{MM}-{dd} {H}:{mm}:{ss}') + ' - ' + message);
};

var server = function (router, port) {
  http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;

    if (path != '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    // Check to see if any routes match the path
    var route;
    var routeKeys = router.routes[req.method].keys();

    routeKeys.each(function (key) {
      regexp = new RegExp(key);
      if (regexp.test(path)) {
        route = router.routes[req.method][key];
      }
    });

    if (route) {
      route.callback(req, res);
      log(clc.green('200') + ' [' + req.method + '] ' + path);

    // First check to see if it's the index path
    } else if ('/' === path) {
      drender.renderStatic(req, res, '/index.html');

    // If not check to see if there are any static files that correspond
    } else {
      drender.renderStatic(req, res, path);
    }

  }).listen(port, function () {
    log('Server running on ' + port);
  });

  return {
    renderJade: drender.renderJade
  };
};

module.exports = server;