function Companies() { }

var validator = require('validator');

Companies.prototype.addCompany = function(company) {
  //validate input
  if (
       !company
    || !company.orgNumber
    || !validator.isInt(company.orgNumber + "")
    || company.orgNumber.toString().length != 9
    || !company.name
    || !(typeof company.name === 'string')
    || ( //if phone exists then it must be int
        (typeof company.phone !== 'undefined' && company.phone !== null)
        && (!validator.isInt(company.phone + ""))
       )
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
