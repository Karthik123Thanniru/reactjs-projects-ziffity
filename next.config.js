module.exports = {
    async rewrites() {
      return [
        {
          source: '/:name',
          destination: 'http://sample.magento245.com/:name.html', 
        },
      ];
    },
  };
  