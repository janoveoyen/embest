module.exports = function(req, res, next){
  if(req.body.orgNumber != undefined) {
    return res.status(200).end('');
  }
  
  return res.status(422).end('');
}
