const { createProxyMiddleware } = require('http-proxy-middleware');



module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://food-delivery-app-tup8.onrender.com',
      changeOrigin: true,
    })
  );
};