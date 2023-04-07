import Layout from '@/components/Layout';
import UserProfileSettings from '@/components/UserProfileSettings';
import clientPromise from 'lib/mongodb';
import { getSession } from 'next-auth/react';

export default function Profile({ session, user }) {
  return (
    <div>
      <Layout>
        <UserProfileSettings session={session} user={user} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const client = await clientPromise;
  const db = client.db('snapseeker');

  // Check user's name and email in the database to display real-time changes.
  const userData = await db.collection('users').findOne({
    email: session.user.email,
  });

  const user = {
    name: userData.name,
    email: userData.email,
  };

  return {
    props: {
      session,
      user,
    },
  };
}
