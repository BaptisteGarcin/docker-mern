const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chokidar = require('chokidar');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../webpack.config.js');
const routes = require('./server/routes.js');

mongoose.connect('mongodb://db:27017/express-mongo');
mongoose.Promise = global.Promise;

const app = express();
const compiler = webpack(config);
const DEV = process.env.NODE_ENV !== 'production';

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());

// Include server routes as a middleware
app.use(function(req, res, next) {
  require('./server/routes')(req, res, next);
});

if (DEV) {
  const watcher = chokidar.watch(path.join(__dirname, 'server'));
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: './dist',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Get index.html from memory and render it
  app.get('*', (req, res) => {
    const indexFile = middleware
      .fileSystem
      .readFileSync(path.join(compiler.outputPath, 'index.html'));
    res.write(indexFile);
    res.end();
  });

  // "Hot reload" server-side code on change
  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Clearing /server/ module cache from server');
      Object.keys(require.cache).forEach(id => {
        if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
      });
    });
  });
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('App listening on port 3000!');
});
