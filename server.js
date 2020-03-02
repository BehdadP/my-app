const express = require('express');
const dbConfig = require('./dbConfig');
const eventRouter = require('./routes/events');
const rankRouter = require('./routes/ranks');
const timeout = require('express-timeout-handler');

const app = express();
const port = 3000;

const apiTimeout = 30* 1000; // 30 seconds timeout to get data from API
var options = {
  timeout: apiTimeout,
  onTimeout: function(req, res) {
    res.status(503).send('Service unavailable. Please retry.');
  },
  disable: ['write', 'setHeaders', 'send', 'json', 'end']
};
app.use(timeout.handler(options));


app.use('/event', eventRouter);
app.use('/rank', rankRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
