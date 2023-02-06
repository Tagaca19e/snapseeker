import clientPromise from '../../../lib/mongodb';

export default async function validateLogin(req, res) {
  // Using the mongodb client, connect to the database.
  const client = await clientPromise;

  // Choose which database you want to use.
  const db = client.db('snapseeker');

  // Find the user in the database.
  const result = await db
    .collection('users')
    .find({
      $and: [
        { email: { $eq: req.body.email } },
        { password: { $eq: req.body.password } },
      ],
    })
    .toArray();

  // Check for the existence of the user.
  if (result.length === 0) {
    return res.status(400).json({ message: 'User not found!' });
  } else {
    res.status(200).json({ message: 'User found!' });
  }
}
