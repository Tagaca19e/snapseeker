import { getSession, signIn } from 'next-auth/react';
import Router from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';

export default function Login() {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState('');

  /* Displays error message for a certain amount of time. */
  const displayError = (message) => {
    setError(true);
    setMessage(message);
    setTimeout(() => {
      setError(false);
    }, 4000);
  };

  /**
   * Validates the user's input and sends a request to MongoDB server to
   * validate user credentials.
   */
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page.
    setButtonDisabled(true); // Disabled the button to prevent multiple clicks.
    setLoading(true); // Set loading to true to display loading message.

    const res = await signIn('credentials', {
      email: event.target.email.value,
      password: event.target.password.value,
      redirect: false,
    });

    if (res.status === 200) {
      Router.push('/dashboard');
    } else {
      displayError(res.error);
    }

    // Set loading to false and enable the button.
    setLoading(false);
    setButtonDisabled(false);
  };

  return (
    <Layout>
      <div className="m-auto flex justify-center">
        <div className="m-auto w-full max-w-md bg-white py-8 px-8 shadow  sm:rounded-lg sm:px-10">
          <form onSubmit={handleLogin}>
            <h1 className="text-center text-3xl font-bold">
              Let's get you saving!
            </h1>

            <div className="mt-6">
              <div className="block ">
                <label
                  htmlFor="email"
                  className="block items-center text-sm font-medium leading-5 text-gray-700"
                >
                  Email Address
                </label>
                <input
                  autocomplete="email"
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  className="form-input mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="block ">
                <label
                  htmlFor="password"
                  className=" block items-center text-sm font-medium leading-5 text-gray-700"
                >
                  Password
                </label>
                <input
                  autocomplete="new-password"
                  placeholder="Password"
                  type="password"
                  name="password"
                  className="form-input mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                  required
                />
              </div>
            </div>

            <div className="mt-4 text-sm font-semibold text-primary">
              <a href="/auth/forgot">Forgot your password?</a>
            </div>

            <div className="mt-4">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white transition duration-150 ease-in-out focus:outline-none focus:ring-4"
                  disabled={buttonDisabled}
                >
                  {loading ? 'Loading...' : 'Login'}
                </button>
                {error && (
                  <p className="mt-2 rounded-md border bg-error_light p-1 text-center text-error">
                    {message}
                  </p>
                )}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm leading-5 text-gray-700">
                Already have an account?{' '}
                <a
                  className="text-primary-primary hover:text-primary-base font-medium underline transition duration-150 ease-in-out focus:underline focus:outline-none"
                  href="/auth/sign-up"
                >
                  Sign up.
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
