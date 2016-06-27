var supertest = require('supertest');
var app = require('../../app');
var Chai = require('chai');
var expect = Chai.expect;



describe("Companies routes",function(){


  it("/companies/add without parameters should return 422",function(done){

    supertest(app)
      .post("/companies/add")
      .expect(422)
      .end(done);

  });


  it("/companies/add with valid orgNumber should return 200",function(done){

    supertest(app)
      .post("/companies/add")
      .send({"orgNumber": "999888777"})
      .expect(200)
      .end(function(err, response) {
          expect(err).to.equal(null);
          console.log(response);
          return done();
      });

  });

});
