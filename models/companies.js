var Db = require('./../helpers/database')
var Validator = require('validator');

const collection = 'companies';
const badCompanyErrorMsg = 'Ugyldig firmainformasjon oppgitt';
const companyAlreadyExistsErrorMsg = "Firmaet er allerede registrert";
const noSearchStringErrorMsg = "Ugyldig søkefrase oppgitt";

function Companies() { }

/* orgNumber should be a numeric string with excactly 9 digits */
var isOrgNumberValid = function(orgNumber) {
  if
  (
    !orgNumber
    || !(typeof orgNumber === "string")
    || !Validator.isInt(orgNumber)
    || orgNumber.length != 9
  )
  {
    return false;
  }

  return true;
}

/* company name should be a string */
var isCompanyNameValid = function(name) {
  if ( !name || !(typeof name === 'string') ){
    return false;
  }
  return true;
}

/* salesPerson should be "Firstname Lastname" with minimum 2 letters in each */
var isSalesPersonValid = function(salesPerson) {
  if
    (
      !salesPerson
      || !(typeof salesPerson === 'string')
      || salesPerson.length <= 4
      || salesPerson.indexOf(" ") == -1
      || Validator.isInt(salesPerson)
    )
  {
      return false;
  }

  return true;
}

/* if phone is not blank then it should be a numeric string */
var isPhoneValidIfPresent = function(phone) {

  if
  (
    ( typeof phone !== 'undefined' && phone !== null )
    && ( (typeof phone !== "string") || !Validator.isInt(phone) )
  )
  {
    return false
  }

  return true
}

/* if email is not blank then it should be a valid email address */
var isEmailValidIfPresent = function(email) {
  if (
       (typeof email !== 'undefined' && email !== null)
       && (!Validator.isEmail(email + ""))
     )
     {
       return false
     }

  return true
}

/* if mailingAddress is not blank then
   it should be a non-numeric non-email string */
var isMailingAddressValidIfPresent = function(mailingAddress) {
  if (
        (
          (typeof mailingAddress !== 'undefined')
          && mailingAddress !== null
        )
        &&
        (
          mailingAddress === ""
          || Validator.isEmail(mailingAddress)
          || Validator.isInt(mailingAddress)
        )
     )
     {
       return false
     }

     return true
}

Companies.prototype.addCompany = function(company, done) {
  //validate input
  if (
       !company
       || !isOrgNumberValid(company.orgNumber)
       || !isCompanyNameValid(company.name)
       || !isSalesPersonValid(company.salesPerson)
       || !isPhoneValidIfPresent(company.phone)
       || !isEmailValidIfPresent(company.email)
       || !isMailingAddressValidIfPresent(company.mailingAddress)
    )
  {
    return done(new Error(badCompanyErrorMsg));
  }

  Db.insertOne(collection, company, function(err, result) {

    if (err) {
      return done(new Error(companyAlreadyExistsErrorMsg));
    }

    return done(null)

  })

};

Companies.prototype.getCompanies = function(searchString, done) {

  done(new Error(noSearchStringErrorMsg));
}

module.exports = Companies;
