import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '/lib/mongodb';
import bcrypt from 'bcrypt';
import passwordValidation from 'lib/passwordValidation';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      authorize: async (credentials) => {
        const { email, password } = credentials;

        if (!passwordValidation(password)) {
          throw new Error('Invalid email or password');
        }
        const client = await clientPromise;
        const db = client.db('snapseeker');
        const result = await db.collection('users').findOne({ email: email });

        if (!result) {
          throw new Error('Invalid email or password');
        } else {
          const match = await bcrypt.compare(password, result?.password);
          if (match) {
            return {
              name: result.first_name,
              email: result.email,
            };
          }
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
});
