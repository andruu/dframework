module.exports = function () {
  this.routes = Object.extended({
    GET: Object.extended({}),
    POST: Object.extended({}),
    PUT: Object.extended({}),
    DELETE: Object.extended({})
  });
  this.addRoute = function (method, path, callback) {
    this.routes[method][path] = {method: method, path: path, callback: callback};
  };
  this.get = function (path, callback) {
    this.addRoute('GET', path, callback);
  };
  this.post = function (path, callback) {
    this.addRoute('POST', path, callback);
  };
  this.put = function (path, callback) {
    this.addRoute('PUT', path, callback);
  };
  this.delete = function (path, callback) {
    this.addRoute('DELETE', path, callback);
  };
};