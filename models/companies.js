function Companies() { }

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

var isPhoneValid = function(phone) {
  //if phone exists then it must be int
  if
  (
    (typeof phone !== 'undefined' && phone !== null)
    && !validator.isInt(phone + "")
  )
  {
    return false;
  }

  return true;
}

Companies.prototype.addCompany = function(company) {
  //validate input
  if (
       !company
    || !isOrgNumberValid(company.orgNumber)
    || !isCompanyNameValid(company.name)
    || !isPhoneValid(company.phone)
    || (  //if email exists then it must be valid address
        (typeof company.email !== 'undefined' && company.email !== null)
        && (!validator.isEmail(company.email + ""))
       )
    || ( //if mailingAddress exists then it must be string with content
          (
            (typeof company.mailingAddress !== 'undefined')
            && company.mailingAddress !== null
          )
          && (
               company.mailingAddress === ""
               || validator.isEmail(company.mailingAddress)
               || validator.isInt(company.mailingAddress)
             )
       )
    )
  {
    return false;
  }

  return true;

};

module.exports = Companies;
