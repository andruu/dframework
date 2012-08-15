var fs     = require('fs'),
    util   = require('util'),
    clc    = require('cli-color'),
    jade   = require('jade');

var content_types = Object.extended({
  'html': 'text/html',
  'htm':  'text/html',
  'css':  'text/css',
  'js':   'text/javascript',
  'jpg':  'image/jpeg',
  'jpeg': 'image/jpeg',
  'png':  'image/png',
  'gif':  'image/gif',
  'xml':  'text/xml',
  'json': 'application/json',
  'zip':  'application/zip',
  'txt':  'text/plain',
  'ico':  'image/x-icon'
});

var log = function (message) {
  console.log(Date.create().format('{yyyy}-{MM}-{dd} {H}:{mm}:{ss}') + ' - ' + message);
};

var staticFile = function (path, callback) {
  fs.readFile(path, function (err, data) {
    callback(data);
  });
};

var renderJade = function (path, req, res, locals) {
  if (!locals) locals = {};
  var fullPath = 'views/' + path + '.jade';
  fs.exists(fullPath, function (exists) {
    if (exists) {
      staticFile(fullPath, function (file) {
        var fn = jade.compile(file, {
          filename: fullPath,
          pretty: true
        });
        var output = fn(locals);

        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Content-Length': output.length
        });
        res.end(output);
      });
    } else {
      res.writeHead(404);
      res.end('Template not found');
      log(clc.magenta('404') + ' [' + req.method + '] ' + fullPath + ' not found');
    }
  });
};

var renderStatic = function (req, res, path) {
  var fullPath = 'public' + path;
  fs.exists(fullPath, function (exists) {

    var extension = path.split('.').last();
    if (content_types.has(extension)) {
      content_type = content_types[extension];
    } else {
      content_type = content_types['txt'];
    }

    if (exists) {
      staticFile(fullPath, function (file) {
        res.writeHead(200, {
          'Content-Type': content_type,
          'Content-Length': file.length
        });
        res.end(file);
        log(clc.cyan('200') + ' [' + req.method + '] ' + fullPath);
      });
    } else {
      res.writeHead(404);
      res.end('File not found');
      log(clc.magenta('404') + ' [' + req.method + '] ' + fullPath + ' not found');
    }
  });
};

exports.renderJade = renderJade;
exports.renderStatic = renderStatic;
