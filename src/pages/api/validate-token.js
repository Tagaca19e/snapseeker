import clientPromise from '../../../lib/mongodb';

const jwt = require('jsonwebtoken');

export default async function forgotPassword(req, res) {
  const secret = process.env.JWT_SECRET;
  try {
    const payload = jwt.verify(re.body.token, secret);
    res.render('reset-password', { token: req.body.token });
  } catch (error) {
    console.log(error.message)
    res.send(error.message);
  }
}
