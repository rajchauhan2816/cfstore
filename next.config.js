module.exports = {

  target: 'serverless',

  images: {
    domains: ['cdn.shopify.com', 'localhost', '50.0.5.50'],
  },
  devIndicators: {
    autoPrerender: false,
  },
};
