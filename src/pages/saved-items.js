import { getSession } from 'next-auth/react';
import { React } from 'react';
import CameraUpload from '../components/dashboard/CameraUpload';
import Layout from '../components/dashboard/Layout';
import ProductListLoader from '../components/dashboard/loaders/ProductList';
import ProductList from '../components/dashboard/ProductList';
import clientPromise from '/lib/mongodb';

export default function SavedItems({ savedItems, savedItemIds, isMobileView }) {
  console.log(savedItems);

  return (
    <div>
      <Layout>
        <CameraUpload isMobileView={isMobileView} /> <ProductListLoader />
        <ProductList
          products={savedItems}
          savedProductsPage={true}
          userSavedItemIds={savedItemIds}
        />{' '}
      </Layout>{' '}
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

  const data = await db
    .collection('save_items')
    .find({ user: session.user.email })
    .limit(20)
    .toArray();
  const savedItems = JSON.parse(JSON.stringify(data));

  // Keep track of item ids to mark items that are currently saved.
  const savedItemIds = savedItems.map((item) => item.product_id);

  const userAgent = context.req.headers['user-agent'];
  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  )
    ? true
    : false;

  return {
    props: {
      session,
      savedItems,
      savedItemIds,
      isMobileView,
    },
  };
}
