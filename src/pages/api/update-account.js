import clientPromise from '/lib/mongodb';
import passwordValidation from 'lib/passwordValidation';
import bcrypt from 'bcrypt';

export default async function updateAccount(req, res) {
  const client = await clientPromise;
  const db = client.db('snapseeker');
  const saltRounds = 10;

  let updateOptions = {};
  // Check on what to update, either password or name.
  if (req.body.new_password) {
    if (!passwordValidation(req.body.new_password)) {
      return res.status(400).json({
        message:
          'Password must be 8 Characters or longer and contain at least one' +
          'lowercase letter, one uppercase letter, one number, and one ' +
          'special characters',
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.new_password, saltRounds);
    updateOptions = { password: hashedPassword };
  } else {
    updateOptions = { name: `${req.body.first_name} ${req.body.last_name}` };
  }

  try {
    // Check if account exists.
    let response = await db.collection('users').findOne({
      email: req.body.email,
    });
    if (!response) {
      return res.status(404).json({ message: 'Account not found!' });
    }

    // If updating password, check if current password matches.
    if (req.body.new_password) {
      const match = await bcrypt.compare(
        req.body.current_password,
        response.password
      );
      if (!match) {
        return res
          .status(400)
          .json({ message: 'Password does not match current password!' });
      }
    }

    response = await db.collection('users').updateOne(
      {
        email: req.body.email,
      },
      { $set: updateOptions }
    );

    if (response.acknowledged) {
      if (req.body.new_password) {
        return res.status(200).json({ message: 'Password updated!' });
      } else {
        return res
          .status(200)
          .json({ message: 'Name updated!' });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Account not updated! Please try again.', error });
  }
}
