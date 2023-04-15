import clientPromise from '/lib/mongodb';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export default async function forgotPassword(req, res) {
  const client = await clientPromise;
  const db = client.db('snapseeker');

  // Validate the user exists.
  const result = await db
    .collection('users')
    .find({
      email: { $eq: req.body.email },
    })
    .toArray();
  const user = result[0];
  
  if (!user) {
    return res.status(400).json({ message: 'User does not exist.' });
  }

  // Encrypt token for one time use.
  const secret = process.env.JWT_SECRET + user.password;
  const payload = {
    email: req.body.email,
    id: user._id,
  };

  // Create a token that expires in 10 minutes.
  const token = jwt.sign(payload, secret, { expiresIn: '10m' });
  const url = `http://snapseeker.vercel.app/auth/reset-password/${user._id}/${token}`;

  // Use node mailer to send the email.
  const transporter = nodemailer.createTransport(
    { sendmail: true },
    {
      from: 'noreply@snapseeker.com',
      to: req.body.email,
      subject: 'Reset your password',
    }
  );

  // Send one time link to user.
  transporter.sendMail({ text: url });
  res
    .status(200)
    .json({ message: `One time link was sent to ${req.body.email}` });
}
