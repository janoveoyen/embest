function Companies() { }

var validator = require('validator');

Companies.prototype.addCompany = function(company) {
  //validate input
  if (
       !company
    || !company.orgNumber
    || !validator.isInt(company.orgNumber + "")
    || company.orgNumber.toString().length != 9
  ) {
    return false;
  }

  return true
};

module.exports = Companies;
