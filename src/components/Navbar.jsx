import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
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
              className="block h-12 w-auto rounded-md"
              src="/logos/logo.svg"
              alt="Snapseeker"
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-6">
          {!isLoginPage && (
            <Link
              href="/auth/login"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold transition duration-200 hover:border-none hover:bg-primary hover:text-white"
            >
              Log in <span aria-hidden="true">→</span>
            </Link>
          )}
          {!isSignUpPage && (
            <Link
              href="/auth/sign-up"
              className="rounded-md border bg-primary px-3 py-2 text-sm font-semibold text-white transition duration-200 hover:border-gray-300 hover:bg-transparent hover:text-black"
            >
              Sign up
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
