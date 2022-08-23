'use strict';
const connectToDatabase = require('../../db');
const Product = require('../../models/Product');

module.exports.patchAProduct= async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    await connectToDatabase()
    try {
        const reqBody = JSON.parse(event.body)
        const updatedProduct = await Product.updateOne(
            {
              _id: event.pathParameters.id
            },
            { 
                name: reqBody.name,
                title: reqBody.title,
                img: reqBody.img,
                price: reqBody.price,
                company: reqBody.company,
                info: reqBody.info, 
            }
          );

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(updatedProduct),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                
              }
          })
      } catch (error) {
        console.log(error)
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true, },
            body: 'Could not create the product.'
          })
      }
  };
