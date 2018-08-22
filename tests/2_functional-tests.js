/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
var numtemp=0;
var numlikes=0;
chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end(function(err, res){
        // console.log(res.body.stockData[0])
                   assert.equal(res.status, 200);
              assert.property(res.body.stockData[0], 'stock', 'Books in array should contain stock');
          assert.property(res.body.stockData[0], 'price', 'Books in array should contain price');
        assert.property(res.body.stockData[0], 'likes', 'Books in array should contain likes');
       
        done();
        });
      });
      
      test('1 stock with like', function(done) {
         chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog',like:true})
        .end(function(err, res){
          assert.equal(res.status, 200);
              assert.property(res.body.stockData[0], 'stock', 'Books in array should contain stock');
          assert.property(res.body.stockData[0], 'price', 'Books in array should contain price');
        assert.property(res.body.stockData[0], 'likes', 'Books in array should contain likes');
       assert.isNotNaN(res.body.stockData[0].likes, 'is not NaN');
numtemp=res.body.stockData[0].likes
        done();
      });
      });
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
         chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog',like:true})
        .end(function(err, res){
          assert.equal(res.status, 200);
              assert.property(res.body.stockData[0], 'stock', 'Books in array should contain stock');
          assert.property(res.body.stockData[0], 'price', 'Books in array should contain price');
        assert.property(res.body.stockData[0], 'likes', 'Books in array should contain likes');
       assert.isNotNaN(res.body.stockData[0].likes, 'is not NaN');
assert.equal(numtemp,res.body.stockData[0].likes)
        done();
      });
      });
      
      test('2 stocks', function(done) {
         chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['goog','fb']})
        .end(function(err, res){
         console.log(res.body.stockData[0])
                   assert.equal(res.status, 200);
              assert.property(res.body.stockData[0], 'stock', 'Books in array should contain stock');
          assert.property(res.body.stockData[0], 'price', 'Books in array should contain price');
        assert.property(res.body.stockData[0], 'likes', 'Books in array should contain likes');
       assert.property(res.body.stockData[1], 'stock', 'Books in array should contain stock');
          assert.property(res.body.stockData[1], 'price', 'Books in array should contain price');
        assert.property(res.body.stockData[1], 'likes', 'Books in array should contain likes');
        done();
        });
      });
      
      test('2 stocks with like', function(done) {
          chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['goog','fb'],like:true})
        .end(function(err, res){
         console.log(res.body.stockData[0])
                   assert.equal(res.status, 200);
              assert.property(res.body.stockData[0], 'stock', 'Books in array should contain stock');
          assert.property(res.body.stockData[0], 'price', 'Books in array should contain price');
        assert.property(res.body.stockData[0], 'rel_likes', 'Books in array should contain likes');
       assert.property(res.body.stockData[1], 'stock', 'Books in array should contain stock');
          assert.property(res.body.stockData[1], 'price', 'Books in array should contain price');
        assert.property(res.body.stockData[1], 'rel_likes', 'Books in array should contain likes');
        done();
        });
      });
      
    });

});
