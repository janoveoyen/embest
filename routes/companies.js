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

  app.post('/companies/findOneByOrgNumber', function(req, res, next) {

    companies.findOneByOrgNumber(req.body, function(err, result) {
      if (err) {
        return res.status(422).end('');
      }
      else {
        return res.status(200).json(result).end('');
      }

    });

  });

  app.post('/companies/findByName', function(req, res, next) {

    companies.findByName(req.body.name, function(err, result) {
      if (err) {
        return res.status(422).end('');
      }
      else {
        return res.status(200).json(result).end('');
      }
    })

  });

}
