'use strict';
const connectToDatabase = require('../../db');
const Product = require('../../models/Product');

module.exports.deleteAProduct= async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    await connectToDatabase()
    try {
        const removedProduct = await Product.findByIdAndRemove(event.pathParameters.id)
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ message: 'Removed note with id: ' + removedProduct._id, removedProduct: removedProduct }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                
              }
          })
      } catch (error) {
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true, },
            body: 'Could not fetch the products.'
          })
      }
  };
