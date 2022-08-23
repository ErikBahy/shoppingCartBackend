'use strict';
const connectToDatabase = require('../../db');
const ShoppingCart = require('../../models/ShoppingCart');




module.exports.deleteAShoppingCartItem = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    await connectToDatabase()
    try {
        const removedItem = await ShoppingCart.findByIdAndRemove(event.pathParameters.id);
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ message: 'Removed note with id: ' + removedItem._id, removedItem: removedItem }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                
              }
          })
      } catch (error) {
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' , 'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,},
            body: 'Could not fetch the products.'
          })
      }
  };
