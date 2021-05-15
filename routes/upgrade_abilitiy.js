var express = require('express');
var router = express.Router();
const AbilityUpagradesService = require("../service/upgrade_abilitiy.service")
const ResponseBuilder = require("../helper/response-builder")
/* GET home page. */

router.get('/', list);
module.exports = router;

function list(req, res, next) {
    AbilityUpagradesService.get()
    .then(value=>  ResponseBuilder.success(res,value) )
    .catch(reason =>  ResponseBuilder.error(res, reason))
   
    }
    
  
