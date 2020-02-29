const express = require('express');
const dbConfig = require('./dbConfig');
const eventRouter = require('./routes/events');
const rankRouter = require('./routes/ranks');


const app = express();
const port = 3000;

const apiTimeout = 30 * 1000;

 app.use((req, res, next) => {

    res.setTimeout(apiTimeout, () => {
        let err = new Error('Timeout reteriving data');
        err.status = 503;
        next(err);
    });
    next();
});
// Add CORS for furhter post and put apis . not necessary for current app
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
//

app.use('/event', eventRouter);
app.use('/rank', rankRouter);


app.listen(port, () => console.log(`App listening on port ${port}!`));
