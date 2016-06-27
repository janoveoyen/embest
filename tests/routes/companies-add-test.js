var supertest = require('supertest');
// var app = require('../../app');

describe("Companies routes",function(){

  var server = supertest.agent("http://localhost:3000");

  it("/companies-add without parameters should return 400",function(done){

    server
    .post("/companies-add")
    .expect("Content-type",/json/)
    .expect(400)
    .end(done);

  });

});
