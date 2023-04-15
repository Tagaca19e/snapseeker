import SerpApi from 'google-search-results-nodejs';
import { getSession } from 'next-auth/react';
import CameraUpload from '../components/dashboard/CameraUpload';
import Layout from '../components/dashboard/Layout';
import ProductList from '../components/dashboard/ProductList';
import ProductListLoader from '../components/dashboard/ProductListLoader';
import clientPromise from '/lib/mongodb';

export default function Dashboard({
  products,
  isMobileView,
  userSavedItemIds,
}) {
  return (
    <div>
      <Layout>
        <CameraUpload isMobileView={isMobileView} />
        <ProductListLoader />
        <ProductList
          userSavedItemIds={userSavedItemIds}
          products={products.shopping_results}
        />
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

  // Find all saved items from user.
  const client = await clientPromise;
  const db = client.db('snapseeker');

  let userSavedItems = await db
    .collection('save_items')
    .find({ user: session.user.email })
    .limit(20)
    .toArray();

  userSavedItems = JSON.parse(JSON.stringify(userSavedItems));
  const userSavedItemIds = userSavedItems.map((item) => item.product_id);

  const userAgent = context.req.headers['user-agent'];
  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  )
    ? true
    : false;

  const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);
  const productsPromise = new Promise((resolve, reject) => {
    search.json(
      {
        engine: 'google_shopping',
        google_domain: 'google.com',
        q: 'starbucks coffee',
        location: 'United States',
      },
      (data) => {
        if (data) {
          resolve(data);
        } else {
          reject('No data');
        }
      }
    );
  });

  const products = await productsPromise;

  return {
    props: {
      session,
      products: products || {},
      isMobileView,
      userSavedItemIds: userSavedItemIds || [],
    },
  };
}
