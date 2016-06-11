function Companies() { }

const badCompanyErrorMsg = 'Ugyldig firmainformasjon oppgitt'

var validator = require('validator');

/* orgNumber should be a numeric string with excactly 9 digits */
var isOrgNumberValid = function(orgNumber) {
  if
  (
    !orgNumber
    || !(typeof orgNumber === "string")
    || !validator.isInt(orgNumber)
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
      || validator.isInt(salesPerson)
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
    && ( (typeof phone !== "string") || !validator.isInt(phone) )
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
       && (!validator.isEmail(email + ""))
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
          || validator.isEmail(mailingAddress)
          || validator.isInt(mailingAddress)
        )
     )
     {
       return false
     }

     return true
}

Companies.prototype.addCompany = function(company) {
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
    throw new Error(badCompanyErrorMsg);
  }

  return true;

};

module.exports = Companies;
