const checkToken = (req, res, next) => {
  // Get authorisation header value
  const bearerHeader = req.headers.authorization;

  // Check bearer exists
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set token
    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = checkToken;
