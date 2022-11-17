const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      lessLoaderOptions: {
        lessOptions: { javascriptEnabled: true },
      },
    },
  ],
  webpack: {
    configure: {
      resolve: {
        fallback: { querystring: require.resolve("querystring-es3") },
      },
    },
  },
};
