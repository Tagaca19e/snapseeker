import clientPromise from 'lib/mongodb';
import { getSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../components/AppContextProvider';
import Layout from '../components/dashboard/Layout';
import ProfileSettings from '../components/dashboard/ProfileSettings';

export default function Profile({ session, user }) {
  const { setCurrentUser } = useContext(AppContext);

  useEffect(() => {
    setCurrentUser(user || null);
  }, []);

  return (
    <div>
      <Layout>
        <ProfileSettings session={session} user={user} />
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
