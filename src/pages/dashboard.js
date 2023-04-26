import SerpApi from 'google-search-results-nodejs';
import { getSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { AppContext } from '../components/AppContextProvider';
import CameraUpload from '../components/dashboard/CameraUpload';
import Layout from '../components/dashboard/Layout';
import ProductListLoader from '../components/dashboard/loaders/ProductList';
import ProductList from '../components/dashboard/ProductList';
import clientPromise from '/lib/mongodb';

export default function Dashboard({
  products,
  isMobileView,
  userSavedItemIds,
}) {
  const { setIsLoading } = useContext(AppContext);
  const [currentProducts, setCurrentProducts] = useState(products);

  /**
   * Changes current product object when user clicks on pagination link.
   * @param {Event} event - On click event when user clicks on pagination link.
   */
  const handlePaginationChange = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/get-paginated-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: event.target.href,
        }),
      });

      const data = await response.json();

      // Change the current product search object.
      setCurrentProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <CameraUpload isMobileView={isMobileView} />
      <ProductListLoader />
      <ProductList
        products={currentProducts}
        onChangePagination={handlePaginationChange}
        userSavedItemIds={userSavedItemIds}
      />
    </Layout>
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
