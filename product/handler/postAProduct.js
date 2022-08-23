'use strict';
const connectToDatabase = require('../../db');
const Product = require('../../models/Product');
const mongoose = require("mongoose");


module.exports.postAProduct= async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    await connectToDatabase()
    try {
        const reqBody = JSON.parse(event.body)
        const newProduct = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: reqBody.name,
            title: reqBody.title,
            img: reqBody.img,
            price: reqBody.price,
            company: reqBody.company,
            info: reqBody.info,
          });
        await newProduct.save();

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(newProduct),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                
              }
          })
      } catch (error) {
        console.log(error)
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' ,'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,},
            body: 'Could not create the product.'
          })
      }
  };
