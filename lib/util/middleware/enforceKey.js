'use strict';

module.exports = function(key){
  return function(req, res, next){
    if(req.body.key === key || req.query.key === key)return next();
    res.send(403);
  };
};