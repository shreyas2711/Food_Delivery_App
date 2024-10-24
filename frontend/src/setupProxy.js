const { createProxyMiddleware } = require('http-proxy-middleware');



module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `${REACT_APP_BASE_URL}`,
      changeOrigin: true,
    })
  );
};