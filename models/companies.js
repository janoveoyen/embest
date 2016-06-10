function Companies() { }

const badCompanyErrorMsg = 'Ugyldig firmainformasjon oppgitt.'

var validator = require('validator');

var isOrgNumberValid = function(orgNumber) {
  if
  (
    !orgNumber
    || !validator.isInt(orgNumber + "")
    || orgNumber.toString().length != 9
  )
  {
    return false;
  }

  return true;
}

var isCompanyNameValid = function(name) {
  if ( !name || !(typeof name === 'string') ){
    return false;
  }
  return true;
}

var isPhoneValidIfPresent = function(phone) {
  //if phone exists then it must be int
  if
  (
    (typeof phone !== 'undefined' && phone !== null)
    && !validator.isInt(phone + "")
  )
  {
    return false
  }

  return true
}

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

var isMailingAddressValidIfPresent = function(mailingAddress) {
  //if mailingAddress exists then it must be string with content
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
