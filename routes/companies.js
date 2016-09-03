var companies = require('./../models/companies');

module.exports = function(app) {


  app.post('/companies/add', function(req, res, next) {

    companies.addCompany(req.body, function(err, result) {
      if (err) {
        return res.status(422).end('');
      }
      else {
        return res.status(200).end('');
      }

    });

  });

}
