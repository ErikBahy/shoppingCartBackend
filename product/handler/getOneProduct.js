'use strict';
const connectToDatabase = require('../../db');
const Product = require('../../models/Product');

module.exports.getOneProduct = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    await connectToDatabase()
    try {
        callback(null , {
            statusCode: 200,
            body: JSON.stringify(await Product.findOne({_id:event.pathParameters.id})),
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