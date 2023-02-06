import clientPromise from '../../../lib/mongodb';

export default async function createUser(req, res) {
  // Validate the request method.
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Invalid request method!' });
  }

  // Use mongodb client to connect to the database.
  const client = await clientPromise;
  const db = client.db('snapseeker');

  // Create user.
  const result = await db.collection('users').insertOne(req.body);
  if (result.acknowledged) {
    res.status(200).json({ message: 'User created! You may now login.' });
  } else {
    res.status(400).json({ message: 'User not created! Please try again.' });
  }
}
