const midAuth = (req, res, next) => {
  const { headers } = req;
  if (headers.token === '123') {
    next();
  } else {
    res.json('token salah');
  }
};
module.exports = midAuth;
