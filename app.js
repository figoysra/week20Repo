const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const usersrouter = require('./src/routers/users');
const productsrouter = require('./src/routers/products');
const categoryrouter = require('./src/routers/category');
const detailtransaksi = require('./src/routers/detailtransaksi');
const mastertransaksi = require('./src/routers/mastertransaksi');
// const { REDIS_URL, REDIS_PASSWORD, REDIS_PORT } = require('./src/helpers/env');

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(`${__dirname}/uploads`));
app.use(usersrouter);
app.use(productsrouter);
app.use(categoryrouter);
app.use(mastertransaksi);
app.use(detailtransaksi);

app.listen(2000, () => {
  // eslint-disable-next-line no-console
  console.log('service running on port 2000');
});

const client = redis.createClient({
  host: 'redis-10687.c293.eu-central-1-1.ec2.cloud.redislabs.com', // localhost
  port: 10687,
  password: '12345',
});
client.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});

module.exports = app;
