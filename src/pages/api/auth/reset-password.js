import clientPromise from '/lib/mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

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
    const client = await clientPromise;
    const db = client.db('snapseeker');

    // Find the user in the database.
    const user = await db
      .collection('users')
      .find({ _id: ObjectId(req.body.id) })
      .toArray();

    const secret = process.env.JWT_SECRET + user[0].password;
    const payload = jwt.verify(req.body.token, secret);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result = await db
      .collection('users')
      .updateOne(
        { email: payload.email },
        { $set: { password: hashedPassword } }
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
