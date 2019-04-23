/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');

const config = require('./config');

const cors = require('cors');

const app = express();
module.exports = app;

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
app.set('port', config.port || 8090);
app.use(compression());
app.use(morgan(':date[web] :method :url :status :response-time ms :remote-addr'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.set('secret', config.secret);
app.enable('trust proxy');

/**
 * API routes.
 */

app.use('/api/auth', require('./routes/auth'));
app.use('/api/history', require('./routes/history'));
app.use('/api/like', require('./routes/like'));
app.use('/api/score', require('./routes/score'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/report', require('./routes/report'));

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
