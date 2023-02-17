import clientPromise from '/lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function forgotPassword(req, res) {
  const client = await clientPromise;
  const db = client.db('snapseeker');

  // Find the user in the database.
  const user = await db
    .collection('users')
    .find({ _id: ObjectId(req.body.id) })
    .toArray();

  const secret = process.env.JWT_SECRET + user[0].password;
  try {
    jwt.verify(req.body.token, secret);
    res.status(200).send('Token is valid.');
  } catch (error) {
    res.status(401).send(error.message);
  }
}
