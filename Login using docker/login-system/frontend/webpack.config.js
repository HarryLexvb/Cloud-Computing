const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      // Esta regla le dice a webpack que trate los archivos .mjs en node_modules como JavaScript "auto"
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      // Regla para tus archivos .js (excluyendo node_modules)
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // Aseguramos que se resuelvan tanto .js como .mjs
  resolve: {
    extensions: ['.js', '.mjs']
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public')
    },
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
