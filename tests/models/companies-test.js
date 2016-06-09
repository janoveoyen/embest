var chai = require('chai')
var expect = chai.expect
var Companies = require('./../../models/companies')

var companies
var testCompany


describe('Companies', function() {


  beforeEach(function() {
        companies = new Companies();

        testCompany = {
          orgNumber: 999888777,
          name: "Testfirma AS",
          phone: 99887766,
          email: "post@testfirma.as",
          mailingAddress: "Portveien 2, 0123 Oslo",
          contact: {
            name: "Ola Nordmann",
            email: "ola.nordmann@testfirma.as",
            phone: 44332211
          }
        }
  })

/*--------------------------------------------------------------------------*/
/*------------------------ addCompany tests --------------------------------*/
/*--------------------------------------------------------------------------*/

//test validation

  it('addCompany() should return false on no company', function() {
    expect(companies.addCompany()).to.equal(false)
    expect(companies.addCompany("")).to.equal(false)
    expect(companies.addCompany(undefined)).to.equal(false)
  })

  it('addCompany() should return false if bad company.orgNumber', function() {
    testCompany.orgNumber = null
    expect(companies.addCompany(testCompany)).to.equal(false)

    testCompany.orgNumber = "bad orgnr"
    expect(companies.addCompany(testCompany)).to.equal(false)

    testCompany.orgNumber = 1234
    expect(companies.addCompany(testCompany)).to.equal(false)

    testCompany.orgNumber = 1.3456789
    expect(companies.addCompany(testCompany)).to.equal(false)
  })

  it('addCompany() should return false if bad company.name', function() {
    testCompany.name = null
    expect(companies.addCompany(testCompany)).to.equal(false)

    testCompany.name = 1234
    expect(companies.addCompany(testCompany)).to.equal(false)

    testCompany.name = ""
    expect(companies.addCompany(testCompany)).to.equal(false)
  })

})
