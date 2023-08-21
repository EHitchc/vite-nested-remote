const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { dependencies } = require("./package.json");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'production',
  target: 'web',
  devtool: false,
  output: {
    publicPath: 'http://localhost:5002/'
  },
  optimization: {
    // minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          target: 'es2021',
          tsconfig: path.resolve(__dirname, './tsconfig.json'),
        }
      }
    ]
  },
  // externals: ["react", "react-dom"],
  plugins: [
    new ModuleFederationPlugin({
      name: 'nestedWebpackRemote',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button'
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom']
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname)
    },
    port: 5002,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
}
