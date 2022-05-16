const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/MOUKA/Api/customers",
    createProxyMiddleware({
      target: "http://sompower.westeurope.cloudapp.azure.com",
      changeOrigin: true,
    })
  );
};
