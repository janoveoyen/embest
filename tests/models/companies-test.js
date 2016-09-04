var Chai = require('chai');
var expect = Chai.expect;
var sinon = require('sinon');
var companies = require('./../../models/companies');
var Db = require('./../../helpers/database');

const badCompanyErrorMsg = "Ugyldig firmainformasjon oppgitt";
const companyAlreadyExistsErrorMsg = "Firmaet er allerede registrert";
const noSearchStringErrorMsg = "Ugyldig søkefrase oppgitt";

var testCompany;

var resetTestCompany = function() {

  testCompany = {
    orgNumber: "999888777",
    name: "Testfirma AS",
    salesPerson: "Ola Testselger",
    phone: "99887766",
    email: "post@testfirma.as",
    mailingAddress: "Portveien 2, 0123 Oslo"
  }
}



describe('Companies', function() {

  beforeEach(function() {
        resetTestCompany();
  })



  describe("addCompany()", function() {



    describe("Validation", function() {


      it('should return Error if null company', function(done) {
        companies.addCompany(null, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
          done();
        });

      });


      it('should return Error if empty company', function(done) {
        companies.addCompany("", function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
          done();
        });
      });


      it('should return Error if undefined company', function(done) {
        companies.addCompany(undefined, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
          done();
        });

      });


      it('should return Error if bad company.orgNumber', function(done) {
        testCompany.orgNumber = null;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
      });

        testCompany.orgNumber = "bad orgnr";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.orgNumber = "1234";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.orgNumber = 1234;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.orgNumber = "1.3456789";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        done();
      });


      it('should return Error if bad company.name', function(done) {
        testCompany.name = null;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.name = 1234;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.name = "";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        done();
      });


      it('should return Error if bad company.salesPerson', function(done) {
        testCompany.salesPerson = null;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.salesPerson = undefined;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.salesPerson = 1234;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.salesPerson = "";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.salesPerson = "abcd";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.salesPerson = "abcde";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        done();
      });


      it('should return Error if bad company.phone exists', function(done) {

        testCompany.phone = null;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.phone = undefined;
        companies.addCompany(testCompany, function(err) {
            expect(err).to.be.instanceof(Error);
            expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.phone = "";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.phone = "bad phone number";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.phone = 99887766;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        done();
      });


      it('should return Error if bad company.email exists', function(done) {

        testCompany.email = undefined;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.email = null;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.email = "";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.email = "bad email";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        done();
      });


      it ('should return Error if bad mailingAddress exists', function(done) {

        testCompany.mailingAddress = undefined;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.mailingAddress = null;
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.mailingAddress = "";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.mailingAddress = "1234";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        testCompany.mailingAddress = "ola@nordmann.as";
        companies.addCompany(testCompany, function(err) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal(badCompanyErrorMsg);
        });

        done();
      });

    });



    describe("Adding company", function() {


      it("Should save the correct company to the correct collection"
        , function(done) {

          sinon.stub(Db, 'insertOne', function(collection, document, done) {
            setTimeout(function() {
              done(null, {
                collection: collection,
                company: document
              })
            }, 0);
          })

          var newTestCompany = {
              orgNumber: "999777888",
              name: "Testfirma 2 AS",
              salesPerson: "Kari Testselger",
              phone: "99776622",
              email: "post2@testfirma.as",
              mailingAddress: "Portveien 3, 0123 Oslo"
            }

        companies.addCompany(newTestCompany, function(err, result) {
          expect(err).to.be.null;
          expect(Db.insertOne.getCall(0).args[0]).to.equal("companies")
          expect(Db.insertOne.getCall(0).args[1]).to.equal(newTestCompany)

          Db.insertOne.restore()
          done()
        })

      })


      it("Should return error on inserting existing company (by orgNr)"
        , function(done) {

          sinon.stub(Db, 'insertOne', function(collection, document, done) {
            setTimeout(function() {
              done({
                  "index" : 0,
                  "code" : 11000,
                  "errmsg" : "E11000 duplicate key error collection",
                  "op" : { "_id" : 123456789 }
                })
            }, 0)
          })

          companies.addCompany(testCompany, function(err) {
            expect(err).to.be.instanceof(Error);
            expect(err.message).to.equal(companyAlreadyExistsErrorMsg)

            Db.insertOne.restore()
            done()
          })

        })

      })

    })



  describe("findByName()", function() {


    it('should return Error if null search string', function(done) {

      companies.findByName(null, function(err) {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal(noSearchStringErrorMsg);
        done();
      });

    });


    it('should return Error if empty search string', function(done) {

      companies.findByName("", function(err) {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal(noSearchStringErrorMsg);
        done();
      });

    });


    it('should return Error if undefined search string', function(done) {

      companies.findByName(undefined, function(err) {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal(noSearchStringErrorMsg);
        done();
      });

    });


    it('should return Error if search string length < 3', function(done) {
      companies.findByName("ab", function(err, result) {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal(noSearchStringErrorMsg);
        done();
      });
    });


    it("Should return empty array if no match found", function(done) {

      var find = sinon.stub(Db, 'find', function(collection, query, done) {
        setTimeout(function() {
          done(null, []);
        }, 0)
      })

      companies.findByName("not a name", function(err, result) {
        expect(err).to.equal(null);
        expect(result.length).to.equal(0);

        sinon.assert.calledWith(find,
          "companies",
          {name: new RegExp("not a name", "i")}
        );

        Db.find.restore();
        done()
      })

    })


    it("Should return correct company on match", function(done) {

      var find = sinon.stub(Db, 'find', function(collection, query, done) {
        setTimeout(function() {
          done(null, [testCompany])
        }, 0)
      })

        companies.findByName("Testfirma AS", function(err, result) {
          expect(err).to.equal(null);

          sinon.assert.calledWith( find,
            "companies",
            {name: new RegExp("Testfirma AS", "i")}
          );

          expect(result[0]).to.equal(testCompany);
          Db.find.restore();
          done()
        })

    })


    it("Should return correct companies on multiple matches", function(done) {

      var newTestCompany = {
          orgNumber: "999777888",
          name: "Testfirma 2 AS",
          salesPerson: "Kari Testselger",
          phone: "99776622",
          email: "post2@testfirma.as",
          mailingAddress: "Portveien 3, 0123 Oslo"
        }

      var find = sinon.stub(Db, 'find', function(collection, query, done) {
        setTimeout(function() {
          done(null, [newTestCompany, testCompany])
        }, 0)
      })

      companies.findByName("Testfirma", function(err, result) {
        expect(err).to.equal(null);

        sinon.assert.calledWith( find,
          "companies",
          {name: new RegExp("Testfirma", "i")}
        );

        expect(result[0]).to.equal(newTestCompany);
        expect(result[1]).to.equal(testCompany);
        Db.find.restore();
        done()
      })

    })

  });



  describe("findOneByOrgNumber()", function() {


    it('should return Error if null search string', function(done) {

      companies.findOneByOrgNumber(null, function(err) {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal(noSearchStringErrorMsg);
        done();
      });

    });


    it('should return Error if empty search string', function(done) {

      companies.findOneByOrgNumber("", function(err) {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal(noSearchStringErrorMsg);
        done();
      });

    });


    it('should return Error if undefined search string', function(done) {

      companies.findOneByOrgNumber(undefined, function(err) {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal(noSearchStringErrorMsg);
        done();
      });

    });


    it('should return Error if search string length < 9', function(done) {
      companies.findOneByOrgNumber("99988877", function(err, result) {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal(noSearchStringErrorMsg);
        done();
      });
    });


    it('should return Error if orgNumber not a number', function(done) {
      companies.findOneByOrgNumber("99988877a", function(err, result) {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal(noSearchStringErrorMsg);
        done();
      });
    });


    it("Should return null if no match found", function(done) {

      var find = sinon.stub(Db, 'find', function(collection, query, done) {
        setTimeout(function() {
          done(null, []);
        }, 0)
      })

      companies.findOneByOrgNumber("999888777", function(err, result) {
        expect(err).to.equal(null);
        expect(result).to.equal(null);

        sinon.assert.calledWith(find,
          "companies",
          {orgNumber: "999888777"}
        );

        Db.find.restore();
        done()
      })

    })


    it("Should return correct company on match", function(done) {

      var find = sinon.stub(Db, 'find', function(collection, query, done) {
        setTimeout(function() {
          done(null, [testCompany])
        }, 0)
      })

        companies.findOneByOrgNumber("999888777", function(err, result) {
          expect(err).to.equal(null);

          sinon.assert.calledWith( find,
            "companies",
            {orgNumber: "999888777"}
          );

          expect(result).to.equal(testCompany);
          Db.find.restore();
          done()
        })

    })

  })

});
