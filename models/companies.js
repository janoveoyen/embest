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
  )
  {
    return false;
  }

};

module.exports = Companies;
