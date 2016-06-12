var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon');

var Companies = require('./../../models/companies')
var Db = require('./../../helpers/database')

var companies
var testCompany

const badCompanyErrorMsg = "Ugyldig firmainformasjon oppgitt"

var resetTests = function() {
  companies = new Companies();

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
        resetTests();
  })

/*---------------------------------------------------------------------------*/
/*------------------------ addCompany tests ---------------------------------*/
/*---------------------------------------------------------------------------*/
  describe("addCompany()", function() {

    describe("Validation", function() {

      it('should throw error if no company', function() {
        expect(companies.addCompany.bind(companies)).to.throw(badCompanyErrorMsg)
        expect(companies.addCompany.bind(companies, "")).to.throw(badCompanyErrorMsg)
        expect(companies.addCompany.bind(companies, undefined)).throw(badCompanyErrorMsg)
        expect(companies.addCompany.bind(companies, null)).throw(badCompanyErrorMsg)
      })

      it('should throw error if bad company.orgNumber', function() {
        testCompany.orgNumber = null
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.orgNumber = "bad orgnr"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.orgNumber = "1234"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.orgNumber = 1234
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.orgNumber = "1.3456789"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

      })

      it('should throw error if bad company.name', function() {
        testCompany.name = null
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.name = 1234
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.name = ""
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

      })

      it('should throw error if bad company.salesPerson', function() {
        testCompany.salesPerson = null
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.salesPerson = undefined
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.salesPerson = 1234
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.salesPerson = ""
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.salesPerson = "abcd"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.salesPerson = "abcde"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

      })

      it('should throw error if bad company.phone exists', function() {

        testCompany.phone = null
        expect(companies.addCompany.bind(companies, testCompany))
          .to.not.throw(badCompanyErrorMsg)

        testCompany.phone = undefined
        expect(companies.addCompany.bind(companies, testCompany))
          .to.not.throw(badCompanyErrorMsg)

        testCompany.phone = ""
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.phone = "bad phone number"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.phone = 99887766
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

      })

      it('should throw error if bad company.email exists', function() {

        testCompany.email = undefined
        expect(companies.addCompany.bind(companies, testCompany))
          .to.not.throw(badCompanyErrorMsg)

        testCompany.email = null
        expect(companies.addCompany.bind(companies, testCompany))
          .to.not.throw(badCompanyErrorMsg)

        testCompany.email = ""
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.email = "bad email"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

      })

      it ('should throw error if bad mailingAddress exists', function() {

        testCompany.mailingAddress = undefined
        expect(companies.addCompany.bind(companies, testCompany))
          .to.not.throw(badCompanyErrorMsg)

        testCompany.mailingAddress = null
        expect(companies.addCompany.bind(companies, testCompany))
          .to.not.throw(badCompanyErrorMsg)

        testCompany.mailingAddress = ""
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.mailingAddress = "1234"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.mailingAddress = "ola@nordmann.as"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

      })

    })

    describe("Adding company", function() {

      beforeEach(function() {
        sinon.stub(Db, 'insertOne', function(collection, document, done) {
          setTimeout(function() {
            done({
              collection: collection,
              company: document
            })
          }, 0)
        })
      })

      afterEach(function() {
        Db.insertOne.restore();
      });

      it("Should save the correct company to the correct collection"
        , function(done) {

          var newTestCompany = {
              orgNumber: "999777888",
              name: "Testfirma 2 AS",
              salesPerson: "Kari Testselger",
              phone: "99776622",
              email: "post2@testfirma.as",
              mailingAddress: "Portveien 3, 0123 Oslo"
            }

        companies.addCompany(newTestCompany, function(result) {
          expect(result.collection).to.equal("companies")
          expect(result.company).to.equal(newTestCompany)

          done()
        })

      })

    })

  })

})
