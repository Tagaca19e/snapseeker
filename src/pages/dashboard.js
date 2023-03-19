import { React } from 'react';
import Layout from '../components/Layout';
import ProductList from '@/components/ProductList';
import { getSession } from 'next-auth/react';
import CameraUpload from '../components/CameraUpload';
import ProductListLoader from '@/components/ProductListLoader';

export default function dashboard2({ products, isMobileView }) {
  return (
    <div>
      <Layout>
        <CameraUpload isMobileView={isMobileView} />
        <ProductListLoader />
        <ProductList products={products} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // TODO(etagaca): Call better initialization results.
  const res = await fetch(`${process.env.DOMAIN}/api/get-products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: 'coffee',
    }),
  });
  const data = await res.json();

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const userAgent = context.req.headers['user-agent'];
  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  )
    ? true
    : false;

  return {
    props: {
      session,
      products: data,
      isMobileView,
    },
  };
}
