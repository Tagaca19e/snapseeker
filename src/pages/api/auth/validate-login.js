import clientPromise from '/lib/mongodb';
import bcrypt from 'bcrypt';

export default async function validateLogin(req, res) {
    const { email, password } = req.body;
  // Using the mongodb client, connect to the database.
    try {
    const client = await clientPromise;

  // Choose which database you want to use.
  const db = client.db('snapseeker');
        const user = await db.collection('users').findOne({ email: email });
  // Find the user in the database.
        if (!user) {
            return res.status(400).json({ message: 'Email or password is incorrect.' });
        }
        

    const Match = await bcrypt.compare(password, user.password);

  // Check for the existence of the user.
        if (match) {
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(400).json({ message: 'Email or password is incorrect.' });
        }
        } catch (error) {
            res.status(200).json({ message: 'User found!' });
        }
}
