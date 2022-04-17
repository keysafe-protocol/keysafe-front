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
};
