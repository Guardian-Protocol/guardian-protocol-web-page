const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

module.exports = (config) => {
  const env = fs.readFileSync(path.resolve(__dirname, '.env'), 'utf-8')
    .split('\n')
    .filter(Boolean)
    .reduce((acc, line) => {
      const [key, value] = line.split('=');
      acc[`process.env.${key}`] = JSON.stringify(value);
      return acc;
    }, {});

  // Use the DefinePlugin to add the environment variables
  config.plugins.push(new webpack.DefinePlugin(env));

  config.plugins.push(new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }));
  return config;
};
