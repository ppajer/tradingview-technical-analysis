const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts', // Entry point of your TypeScript application
  output: {
    filename: 'bundle.js', // Name of the bundled output file
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean the output directory before each build
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html', // Your custom template
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'], // Resolve these file extensions when importing
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Apply this rule to .ts and .tsx files
        use: 'ts-loader', // Use ts-loader to transpile TypeScript
        exclude: /node_modules/, // Exclude dependencies
      },
      {
        test: /\.css$/, // Apply this rule to .css files
        use: ['style-loader', 'css-loader'], // Use css-loader then style-loader
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Match common image file types
        type: 'asset/resource',         // Tells Webpack to emit the file and return the URL
        }
    ],
  },
  mode: 'production', // Set Webpack mode (development or production)
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serve static files from the 'dist' directory
    port: 3000, // Serve the app on http://localhost:3000
    open: true, // Automatically open the browser when the server starts
  },
};