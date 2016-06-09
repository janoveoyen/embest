var chai = require('chai')
var expect = chai.expect
var Companies = require('./../../models/companies')

var companies
var testCompany

var resetTests = function() {
  companies = new Companies();

  testCompany = {
    orgNumber: 999888777,
    name: "Testfirma AS",
    phone: 99887766/*,
    email: "post@testfirma.as",
    mailingAddress: "Portveien 2, 0123 Oslo",
    contact: {
      name: "Ola Nordmann",
      email: "ola.nordmann@testfirma.as",
      phone: 44332211
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

      it('should return false if no company', function() {
        expect(companies.addCompany()).to.equal(false)
        expect(companies.addCompany("")).to.equal(false)
        expect(companies.addCompany(undefined)).to.equal(false)
      })

      it('should return false if bad company.orgNumber', function() {
        testCompany.orgNumber = null
        expect(companies.addCompany(testCompany)).to.equal(false)

        testCompany.orgNumber = "bad orgnr"
        expect(companies.addCompany(testCompany)).to.equal(false)

        testCompany.orgNumber = 1234
        expect(companies.addCompany(testCompany)).to.equal(false)

        testCompany.orgNumber = 1.3456789
        expect(companies.addCompany(testCompany)).to.equal(false)

        testCompany.orgNumber = 999888777
        expect(companies.addCompany(testCompany)).to.equal(true)

      })

      it('should return false if bad company.name', function() {
        testCompany.name = null
        expect(companies.addCompany(testCompany)).to.equal(false)

        testCompany.name = 1234
        expect(companies.addCompany(testCompany)).to.equal(false)

        testCompany.name = ""
        expect(companies.addCompany(testCompany)).to.equal(false)

        testCompany.name = "Testfirma AS"
        expect(companies.addCompany(testCompany)).to.equal(true)
      })

      it('should return false if bad company.phone exists', function() {

        testCompany.phone = null
        expect(companies.addCompany(testCompany)).to.equal(true)

        testCompany.phone = undefined
        expect(companies.addCompany(testCompany)).to.equal(true)

        testCompany.phone = ""
        expect(companies.addCompany(testCompany)).to.equal(false)

        testCompany.phone = "bad phone number"
        expect(companies.addCompany(testCompany)).to.equal(false)

        testCompany.phone = "99887766"
        expect(companies.addCompany(testCompany)).to.equal(true)
      })

      it('should return false if bad company.email exists', function() {

            testCompany.email = undefined
            expect(companies.addCompany(testCompany)).to.equal(true)

            testCompany.email = null
            expect(companies.addCompany(testCompany)).to.equal(true)

            testCompany.email = ""
            expect(companies.addCompany(testCompany)).to.equal(false)

            testCompany.email = "bad email"
            expect(companies.addCompany(testCompany)).to.equal(false)

      })

    })

  })

})
