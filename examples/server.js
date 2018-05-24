const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express();
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig); // generate compiler

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// notice：only the webpack-dev-middleware need the publicPath,so we should pass it.
app.use(webpackDevMiddleware(compiler,{
	publicPath: webpackConfig.output.publicPath
}));

// HMR
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

const port = process.env.PORT || 8888
app.listen(port,function(){
	console.log(`/n/n example app listening on port ${port}, /n/n`);
})