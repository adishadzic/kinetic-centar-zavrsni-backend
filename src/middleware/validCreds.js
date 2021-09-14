module.exports = function (req, res, next) {
  function validEmail(adminEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(adminEmail);
  }
  if (req.path === '/admin/login') {
    if (![email, password].every(Boolean)) {
      return res.json('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.json('Invalid Email');
    }
  }

  next();
};
