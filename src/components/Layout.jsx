import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
