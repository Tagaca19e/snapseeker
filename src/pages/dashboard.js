import React, { useState } from 'react';
import Layout from '../components/Layout';
import ProductList from '@/components/ProductList';
import { getSession } from 'next-auth/react';
import CameraUpload from '../components/CameraUpload';
import ProductListLoader from '@/components/ProductListLoader';
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
          products={products.data.shopping_results}
        />
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

  return {
    props: {
      session,
      products: data,
      isMobileView,
      userSavedItemIds: userSavedItemIds || [],
    },
  };
}
