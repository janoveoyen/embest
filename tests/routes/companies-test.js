var supertest = require('supertest');
var app = require('../../app');
var Chai = require('chai');
var expect = Chai.expect;
var sinon = require('sinon');
var companies = require('./../../models/companies');

var testCompany = {
    orgNumber: "999888777",
    name: "Testfirma AS",
    salesPerson: "Ola Testselger",
    phone: "99887766",
    email: "post@testfirma.as",
    mailingAddress: "Portveien 2, 0123 Oslo"
  }

describe("Companies routes",function(){


  it("/companies/add without parameters should return 422", function(done){

    supertest(app)
      .post("/companies/add")
      .expect(422)
      .end(done);

  });


  it("/companies/add with valid testCompany should return 200", function(done){

    sinon.stub(companies, 'addCompany', function(company, done) {
      setTimeout(function() {
        done(null)
      }, 0);
    })

    supertest(app)
      .post("/companies/add")
      .send(testCompany)
      .expect(200)
      .end(done);

  });

});
