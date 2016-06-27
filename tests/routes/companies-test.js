var supertest = require('supertest');
 var app = require('../../app');

describe("Companies routes",function(){

  it("/companies/add without parameters should return 422",function(done){

    supertest(app)
      .post("/companies/add")
      .expect(422)
      .end(done);

  });

});
