import clientPromise from '../../../lib/mongodb';

const jwt = require('jsonwebtoken');

export default async function resetPassword(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send('Invalid request method.');
    return;
  }

  // Server-side validation.
  if (req.body.password !== req.body.new_password) {
    res.status(400).send('Passwords do not match.');
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(req.body.token, secret);

    if (payload === 'jwt expired') {
      // Sending a 401 since token is expired and user is unauthenticated.
      res.status(401).send('Token expired');
    }

    const client = await clientPromise;
    const db = client.db('snapseeker');
    const result = await db
      .collection('users')
      .updateOne(
        { email: payload.email },
        { $set: { password: req.body.password } }
      );

    if (result.acknowledged) {
      res.status(200).json({ message: 'Password updated.' });
    } else {
      res.status(400).json({ message: 'Password failed to update!' });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}
