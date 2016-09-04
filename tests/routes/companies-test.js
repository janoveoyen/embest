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


  it("/companies/add without parameters " +
    "should return status 422", function(done){

    sinon.stub(companies, 'addCompany', function(company, done) {
      setTimeout(function() {
        done(null)
      }, 0);
    })

    supertest(app)
      .post("/companies/add")
      .expect(422)
      .end(function () {
        expect(companies.addCompany.getCall(0).args[0]).to.eql({});
        companies.addCompany.restore();
        done();
      });

  });


  it("/companies/add with valid testCompany " +
    "should return status 200", function(done){

    sinon.stub(companies, 'addCompany', function(company, done) {
      setTimeout(function() {
        done(null)
      }, 0);
    })

    supertest(app)
      .post("/companies/add")
      .send(testCompany)
      .expect(200)
      .end( function () {
        expect(companies.addCompany.getCall(0).args[0]).to.eql(testCompany)
        companies.addCompany.restore();
        done();
      });

  });


  it("/companies/findOneByOrgNumber without parameter " +
    "should return status 422", function(done){

    sinon.stub(companies, 'findOneByOrgNumber', function(company, done) {
      setTimeout(function() {
        done(null)
      }, 0);
    })

    supertest(app)
      .post("/companies/findOneByOrgNumber")
      .expect(422)
      .end( function () {
        expect(companies.findOneByOrgNumber.getCall(0).args[0]).to.eql(undefined)
        companies.findOneByOrgNumber.restore();
        done();
      });

  });


  it("/companies/findOneByOrgNumber with invalid orgNumber " +
    "should return status 422", function(done){

    sinon.stub(companies, 'findOneByOrgNumber', function(company, done) {
      setTimeout(function() {
        done(null)
      }, 0);
    })

    supertest(app)
      .post("/companies/findOneByOrgNumber")
      .send({orgNumber: 12345678})
      .expect(422)
      .end( function () {
        expect(companies.findOneByOrgNumber.getCall(0).args[0])
              .to.eql(12345678)
        companies.findOneByOrgNumber.restore();
        done();
      });

  });


  it("/companies/findOneByOrgNumber with valid orgNumber " +
    "should return status 200 and no result on nothing found", function(done){

    sinon.stub(companies, 'findOneByOrgNumber', function(company, done) {
      setTimeout(function() {
        done(null)
      }, 0);
    })

    supertest(app)
      .post("/companies/findOneByOrgNumber")
      .send({orgNumber: 999999999})
      .expect(200)
      .expect({})
      .end( function () {
        expect(companies.findOneByOrgNumber.getCall(0).args[0])
              .to.eql(999999999);
        companies.findOneByOrgNumber.restore();
        done();
      });
  });


  it("/companies/findOneByOrgNumber with valid orgNumber " +
    "should return 200 and correct result on single hit", function(done){

    sinon.stub(companies, 'findOneByOrgNumber', function(company, done) {
      setTimeout(function() {
        done(null, testCompany)
      }, 0);
    })

    supertest(app)
      .post("/companies/findOneByOrgNumber")
      .send({orgNumber: 999888777})
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(testCompany)
      .end( function () {
        expect(companies.findOneByOrgNumber.getCall(0).args[0])
              .to.eql(999888777);
        companies.findOneByOrgNumber.restore();
        done();
      });
  });


  it("/companies/findByName without parameter " +
    "should return status 422", function(done){

      sinon.stub(companies, 'findByName', function(company, done) {
        setTimeout(function() {
          done(null)
        }, 0);
      })

      supertest(app)
        .post("/companies/findByName")
        .expect(422)
        .end( function () {
          expect(companies.findByName.getCall(0).args[0]).to.eql(undefined)
          companies.findByName.restore();
          done();
        });

  });


  it("/companies/findByName with invalid parameter " +
    "should return status 422", function(done){

    sinon.stub(companies, 'findByName', function(company, done) {
      setTimeout(function() {
        done(null)
      }, 0);
    })

    supertest(app)
      .post("/companies/findByName")
      .send({name: "ab"})
      .expect(422)
      .end( function () {
        expect(companies.findByName.getCall(0).args[0]).to.eql("ab")
        companies.findByName.restore();
        done();
      });

  });


  it("/companies/findByName with valid parameter " +
    "should return status 200 and no result on nothing found", function(done){

    var testName = "No such name";

    sinon.stub(companies, 'findByName', function(searchString, done) {
      setTimeout(function() {
        done(null, [])
      }, 0);
    })

    supertest(app)
      .post("/companies/findByName")
      .send({name: testName})
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect({})
      .end( function () {
        expect(companies.findByName.getCall(0).args[0]).to.equal(testName)
        companies.findByName.restore();
        done();
      });
  });


    it("/companies/findByName with valid parameter " +
      "should return status 200 and correct company on hit", function(done){

      var testName = "Testfirma";


      sinon.stub(companies, 'findByName', function(searchString, done) {
        setTimeout(function() {
          done(null, testCompany)
        }, 0);
      })

      supertest(app)
        .post("/companies/findByName")
        .send({name: testName})
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(testCompany)
        .end( function () {
          expect(companies.findByName.getCall(0).args[0]).to.equal(testName)
          companies.findByName.restore();
          done();
        });
    });

    it("/companies/findByName with valid parameter " +
      "should return status 200 and array containing " +
      "correct companies on multiple hits", function(done){

      var testName = "Testfirma";

      var testCompany2 = {
          orgNumber: "999999999",
          name: "Testfirma 2 AS",
          salesPerson: "Kari Testselger",
          phone: "44556677",
          email: "post@testfirma2.as",
          mailingAddress: "Portveien 3, 0123 Oslo"
        }


      sinon.stub(companies, 'findByName', function(searchString, done) {
        setTimeout(function() {
          done(null, [testCompany, testCompany2])
        }, 0);
      })

      supertest(app)
        .post("/companies/findByName")
        .send({name: testName})
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect([testCompany, testCompany2])
        .end( function () {
          expect(companies.findByName.getCall(0).args[0]).to.equal(testName)
          companies.findByName.restore();
          done();
        });
    });

});
