const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api/validator', {
            target: 'http://localhost:8002',
            changeOrigin: true,
        }));

    app.use(
        createProxyMiddleware('/api/generator', {
            target: 'http://localhost:8001',
            changeOrigin: true,
        }));
}