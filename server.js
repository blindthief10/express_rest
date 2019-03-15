const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const orders = require('./orders.json');
const PORT = process.env.PORT || 4000;
const path = require('path');

let currentProductIdsCounter = 8;

// Implement a Restful API for getting, posting, updating and deleting orders from the orders const
// Perform queries from PostMan
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
  const pathToFile = path.resolve(__dirname, './home.html');
  res.sendFile(pathToFile, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Page was sent!');
    }
  });
})

app.get('/orders', (req, res, next) => {
  res.status(200).send(orders);
})

app.post('/orders', (req, res, next) => {
  // We hardcode through Postman an object that fit our JSON schema!
  const responseBody = req.body;
  orders.push(responseBody);
  res.status(201).send('Order was pushed!');
})

app.delete('/orders/:id', (req, res, next) => {
  // explain how to access request parameters in express
  const indexOfOrderToBeDeleted = orders.findIndex(order => order.productId === req.params.id);
  if (indexOfOrderToBeDeleted !== -1) {
    orders.splice(indexOfOrderToBeDeleted, 1);
    res.status(200).send('The order was deleted succesfully!');
  } else {
    res.status(404).send('The order with the given id was not found!');
  }
})

app.put('/orders/:id', (req, res, next) => {
  // create this object manually in postman
  const updatedObject = req.body;
  const findExistingOrderById = orders.findIndex(order => order.productId === req.params.id);
  if (findExistingOrderById !== -1) {
    orders[findExistingOrderById] = updatedObject;
    res.status(200).send(`The order with the id: ${req.params.id} was updated!`);
  }else {
    res.status(404).send('The existing order was not found so it cannot be updated!');
  }
  orders[paramsId] = updatedObject;
})

app.listen(PORT);
console.log(`Server is listening on port: ${PORT}`);
