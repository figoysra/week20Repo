const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const usersrouter = require('./src/routers/users');
const productsrouter = require('./src/routers/products');
const categoryrouter = require('./src/routers/category');
const promorouter = require('./src/routers/promo');
const sizeprice = require('./src/routers/sizeprice');

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(usersrouter);
app.use(productsrouter);
app.use(categoryrouter);
app.use(promorouter);
app.use(sizeprice);

app.listen(2000, () => {
  // eslint-disable-next-line no-console
  console.log('service running on port 2000');
});
