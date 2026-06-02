const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/app/pages/profile/react/index.tsx',
  output: {
    filename: 'profile-react-bundle.js',
    path: path.resolve(__dirname, 'src', 'app', 'pages', 'profile', 'react'),
    library: 'ProfileReact',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    'angular': 'angular',
  },
};
