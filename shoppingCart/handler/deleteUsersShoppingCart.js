'use strict';
const connectToDatabase = require('../../db');
const ShoppingCart = require('../../models/ShoppingCart');




module.exports.deleteUsersShoppingCart = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    await connectToDatabase()
    try {
        const removedUserCart = await ShoppingCart.remove({user:event.pathParameters.id})
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ message: 'Removed note with id: ' + removedUserCart._id, removedUserCart: removedUserCart }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                
              }
          })
      } catch (error) {
        console.log(error)
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' , 'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,},
            body: 'Could not fetch the products.'
          })
      }
  };
