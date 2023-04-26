import { Inter } from '@next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import Vendors from '../components/Vendors';

const inter = Inter({ subsets: ['latin'] });

export default function Shop() {
  return (
    <>
      <Head>
        <title>Snapseeker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <div className="relative isolate overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
              <div className="mx-auto flex max-w-2xl flex-col justify-center lg:mx-0 lg:max-w-xl lg:flex-shrink-0  lg:pt-8">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl">
                  Discover Your Perfect Product with a Snap of an Image!
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  A product finder for best prices over the internet.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/auth/sign-up"
                    className="rounded-md border bg-primary px-3 py-2 text-sm font-semibold text-white transition duration-200 hover:border-gray-300 hover:bg-transparent hover:text-black"
                  >
                    Get started <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="mx-auto mt-16 flex w-full max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                <div className="w-full max-w-lg flex-none">
                  <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl">
                    <img
                      src="/hero.png"
                      alt="App screenshot"
                      width={500}
                      height={500}
                      className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Vendors />
        </Layout>
      </main>
    </>
  );
}
