import { React, useContext } from 'react';
import Layout from '../components/Layout';
import ProductList from '@/components/ProductList';
import { getSession } from 'next-auth/react';
import { AppContext } from '../components/AppContextProvider';

export default function dashboard2({ session, products }) {
  const { setSearchResults } = useContext(AppContext);

  return (
    <div>
      <Layout>
        <ProductList products={products} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // TODO(etagaca): Call initial results.
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

  return {
    props: {
      session,
      products: data,
    },
  };
}
