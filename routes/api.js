
/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';
var ObjectId = require('mongodb').ObjectId;
var express = require("express");
var expect = require('chai').expect;
var MongoClient = require('mongodb');
var request = require('request');
const CONNECTION_STRING = process.env.DB; //
var yahooFinance = require('yahoo-finance');
const middleWare = require('middleware');


module.exports =( function (app) {
  app.enable('trust proxy');
  app.route('/api/stock-prices')
    .get (function (req, res){
    var output=[];
      var url = 'https://finance.google.com/finance/info';
      var likenum = req.query.like ? 1 : 0;var company = Array.isArray(req.query.stock)?req.query.stock:req.query.stock.split(',');
     // console.log(req.ip + req.query.like + likenum+JSON.stringify(req.query)+Array.isArray(company)+company.length); 
    // 
     MongoClient.connect(CONNECTION_STRING, {
          useNewUrlParser: true
        }, function (err, client) {
          const db = client.db("project_stock_price_checker");
        
  for (let index = 0; index < company.length; index++) {
   
       const element = company[index].toUpperCase();
          console.log(element);
      yahooFinance.quote({
        symbol: element,
        modules: ['price', 'summaryDetail'] // see the docs for the full list
      }, function (err, quotes) {
        // .
       
          var query = {
            name: element
          };
        db.collection("finance1").find(query).toArray(function (err, result) {
            if (err) throw err;
          //  console.log('40' + JSON.stringify(result));
        if( !result[0].ip.includes(req.ip)){
          var action = { $inc: {like: likenum}, 
                    $push: {"ip": req.ip}
                  }
              db.collection("finance1").updateOne(query, action , { upsert: true },   function (err, doc) {    if (err) throw err; })
                   
            }                
          new Promise(function (resolve, reject) {
      ( db.collection("finance1").find({_id:result[0]._id  }).toArray(function (err, result1) {
                     //  console.log('78' +JSON.stringify(result1[0]) );
                resolve(result1);    
              output.push ({
                       "stock":element ,
                      "shortname":quotes.shortName,
                      "price": quotes.price.regularMarketPrice,
                      "likes": result1[0].like
                    
                  })
                   
            if( index == company.length-1) { 
            
                 //  console.log('66' +JSON.stringify(output) );
                  if(company.length>1){  
               var rellikes1=     output[0].likes -
                    output[1].likes 
               var rellikes2=     output[1].likes -
                    output[0].likes 
               output[0]['rel_likes'] =rellikes1;
                 output[1]['rel_likes'] =rellikes2;   
                  }
             // console.log('76412' +JSON.stringify(output) );
       res.send(  {
                    "stockData":output }); }
                }));
        });
                    
            }                                  );


        }); };
           
      })
            

    });
})