'use strict';
const connectToDatabase = require('../../db');
const ShoppingCart = require('../../models/ShoppingCart');
const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;


module.exports.postAShoppingCartDecrement = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    await connectToDatabase()
    const reqBody = JSON.parse(event.body)
    const productId = reqBody._id;

  console.log(productId);

  const userId = event.pathParameters.id; //TODO: the logged in user id

  try {
    let carts = await ShoppingCart.findOne({
      user: userId,
      product: { _id: new ObjectId(productId) },
    });
    console.log(carts);
    if (carts.quantity > 1) {
        const newQuantity = carts.quantity - 1;
        const updatedCart = await ShoppingCart.updateOne(
          {
            _id: carts._id,
          },
          { quantity: newQuantity }
        );
        return (callback(null, {
            statusCode: 200,
            body: JSON.stringify(updatedCart),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              }
          }))
      } else {
        const deletedCart = await ShoppingCart.remove({ _id: carts._id });
  
        return (callback(null, {
            statusCode: 200,
            body: JSON.stringify(deletedCart),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                
              }
          }))
      }
  }  catch (error) {
        console.log(error)
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' , 'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,},
            body: 'Could not create the product.'
          })
      }
  };