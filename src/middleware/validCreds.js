module.exports = function (req, res, next) {
  const { admin_first_name, admin_last_name, admin_email, admin_password, admin_profile_picture } = req.body;

  function validEmail(adminEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(adminEmail);
  }

  if (req.path === '/register') {
    console.log(!admin_email.length);
    if (
      ![admin_first_name, admin_last_name, admin_email, admin_password, admin_profile_picture].every(Boolean)
    ) {
      return res.json('Missing Credentials');
    } else if (!validEmail(admin_email)) {
      return res.json('Invalid Email');
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.json('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.json('Invalid Email');
    }
  }

  next();
};
