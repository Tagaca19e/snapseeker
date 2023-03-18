import clientPromise from '/lib/mongodb';
import bcrypt from 'bcrypt';
import passwordValidation from 'lib/passwordValidation';

export default async function createUser(req, res) {
  const { email, password, first_name, last_name } = req.body;
  const saltRounds = 10;

  try {
    // Use mongodb client to connect to the database.
    const client = await clientPromise;
    const db = client.db('snapseeker');

    if (!passwordValidation(password)) {
      return res.status(400).json({
        message:
          'Password must be 8 Characters or longer and contain at least one lowercase letter, one uppercase letter, one number, and one special characters',
      });
    }

    // Check if email already exists.
    const users = await db
      .collection('users')
      .find({ email: req.body.email })
      .toArray();

    if (users.length > 0) {
      // Send 409 status indicating conflict.
      // Ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      return res
        .status(409)
        .json({ message: 'User already exists! Please login.' });
    }
    // Validate the request method.

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user.
    await db.collection('users').insertOne({
      name: `${first_name} ${last_name}`,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created! You may now login.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'User not created! Please try again.' });
  }
}
