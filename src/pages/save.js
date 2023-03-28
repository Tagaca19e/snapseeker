import { React } from 'react';
import Layout from '../components/Layout';
import ProductListSaveItems from '@/components/ProductListSaveItems';
import { getSession } from 'next-auth/react';
import CameraUpload from '../components/CameraUpload';
import ProductListLoader from '@/components/ProductListLoader';
import clientPromise from 'lib/mongodb';

export default function dashboard2({ products, isMobileView }) {
  return (
    <div>
      <Layout>
        <CameraUpload isMobileView={isMobileView} />
        <ProductListLoader />
        <ProductListSaveItems products={products} />
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

  const user_email = session.user.email;

  const client = await clientPromise;

  const db = client.db('snapseeker');
  const data = await db.collection('save_items').find({ user: user_email }).limit(20).toArray();
  const properties = JSON.parse(JSON.stringify(data));




  const userAgent = context.req.headers['user-agent'];
  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  )
    ? true
    : false;

  return {
    props: {
      session,
      products: properties,
      isMobileView,
    },
  };
}