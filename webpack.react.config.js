var path = require('path');

module.exports = {
  entry: './src/app/react/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build/react'),
    filename: 'bundle.js',
    library: 'BlurAdminReact',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
