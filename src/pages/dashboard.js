import { getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { BarcodeReader } from './api/auth/Barcode-scan';

export default function dashboard({ email }) {
  return (
    <div>
      <div>
              <h1>Hello {email}</h1>
        <a
          onClick={() => signOut()}
          className="hover:bg-primary-dark focus:ring-primary-light focus:border-primary-darkest active:bg-primary-darkest flex w-max cursor-pointer justify-center rounded-md border border-transparent bg-cyan-800 py-2 px-4 text-sm font-medium text-white transition duration-150 ease-in-out focus:outline-none focus:ring-4"
        >
          Sign Out
        </a>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If user is not logged in, redirect to login page.
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
      email: session.user.email,
    },
  };
}

export function Scan() {
    console.log('Scan being called');

    return (
        <div>
            <h1>Barcode Reader</h1>
            <BarcodeReader />
        </div>
    );
}
