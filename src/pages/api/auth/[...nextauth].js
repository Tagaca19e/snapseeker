import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import clientPromise from '/lib/mongodb';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const client = await clientPromise;
        const db = client.db('snapseeker');
        const result = await db
          .collection('users')
          .find({
            $and: [
              { email: { $eq: email } },
              { password: { $eq: password } },
            ],
          })
          .toArray();

        if (result.length === 0) {
          throw new Error('Invalid email or password');
        }
        return { email: email  }
      }
    }),
  ],
  pages: {
    signIn: '/auth/login',
  }
})