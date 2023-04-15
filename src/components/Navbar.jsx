import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  let isLoginPage = false;
  let isSignUpPage = false;

  // Check whether to display login or sign up button.
  if (router.pathname === '/auth/login') {
    isLoginPage = true;
  } else if (router.pathname === '/auth/sign-up') {
    isSignUpPage = true;
  }

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-3 lg:px-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Snapeseeker</span>
            <img
              className="block h-12 w-auto animate-spin-slow"
              src="/logos/logo.svg"
              alt="Snapseeker"
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-6">
          {!isLoginPage && (
            <Link
              href="/auth/login"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold transition duration-200 hover:border-none hover:bg-primary hover:text-white"
            >
              Log in <span aria-hidden="true">→</span>
            </Link>
          )}
          {!isSignUpPage && (
            <Link
              href="/auth/sign-up"
              className="rounded-md border bg-primary px-3 py-2 text-sm font-semibold text-white transition duration-200 hover:border-black hover:bg-transparent hover:text-black"
            >
              Sign up
            </Link>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            {!isSignUpPage && (
              <>
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Snapseeker</span>
                  <img
                    className="h-8 w-auto animate-spin-slow"
                    src="/logos/logo.svg"
                    alt="Snapseeker"
                  />
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="ml-auto rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-transparent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Sign up
                </Link>
              </>
            )}
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {!isLoginPage && (
                <div className="py-6">
                  <Link
                    href="/auth/login"
                    className="rounded-md border border-black px-3 py-2 text-sm font-semibold transition duration-200 hover:border-none hover:bg-primary hover:text-white"
                  >
                    Log in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
