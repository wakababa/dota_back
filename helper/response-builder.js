function success(res, payload) {
    return res.status(200).json({payload})
  }
  
  function error(res, code, payload) {
    return res.status(200).json({error: code, payload})
  }
  
  
  module.exports = {success, error};