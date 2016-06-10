var chai = require('chai')
var expect = chai.expect
var Companies = require('./../../models/companies')

var companies
var testCompany

const badCompanyErrorMsg = "Ugyldig firmainformasjon oppgitt."

var resetTests = function() {
  companies = new Companies();

  testCompany = {
    orgNumber: "999888777",
    name: "Testfirma AS",
    phone: "99887766",
    email: "post@testfirma.as",
    mailingAddress: "Portveien 2, 0123 Oslo"/*,
    contact: {
      name: "Ola Nordmann",
      email: "ola.nordmann@testfirma.as",
      phone: "44332211"
    }*/
  }
}

describe('Companies', function() {

  beforeEach(function() {
        resetTests();
  })

/*--------------------------------------------------------------------------*/
/*------------------------ addCompany tests --------------------------------*/
/*--------------------------------------------------------------------------*/
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

        testCompany.orgNumber = "999888777"
        expect(companies.addCompany(testCompany))
          .to.equal(true)

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

        testCompany.name = "Testfirma AS"
        expect(companies.addCompany(testCompany))
          .to.equal(true)
      })

      it('should throw error if bad company.phone exists', function() {

        testCompany.phone = null
        expect(companies.addCompany(testCompany))
          .to.equal(true)

        testCompany.phone = undefined
        expect(companies.addCompany(testCompany)).to.equal(true)

        testCompany.phone = ""
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.phone = "bad phone number"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.phone = 99887766
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.phone = "99887766"
        expect(companies.addCompany(testCompany))
          .to.equal(true)
      })

      it('should throw error if bad company.email exists', function() {

        testCompany.email = undefined
        expect(companies.addCompany(testCompany)).to.equal(true)

        testCompany.email = null
        expect(companies.addCompany(testCompany)).to.equal(true)

        testCompany.email = ""
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.email = "bad email"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.email = "ola@nordmann.as"
        expect(companies.addCompany(testCompany)).to.equal(true)

      })

      it ('should throw error if bad mailingAddress exists', function() {

        testCompany.mailingAddress = undefined
        expect(companies.addCompany(testCompany)).to.equal(true)

        testCompany.mailingAddress = null
        expect(companies.addCompany(testCompany)).to.equal(true)

        testCompany.mailingAddress = ""
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.mailingAddress = "1234"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.mailingAddress = "ola@nordmann.as"
        expect(companies.addCompany.bind(companies, testCompany))
          .to.throw(badCompanyErrorMsg)

        testCompany.mailingAddress = "Portveien 2, 0123 Oslo"
        expect(companies.addCompany(testCompany)).to.equal(true)
      })

    })

  })

})
