import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';

export default function forgot() {
  const [emailSent, setEmailSent] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch('../api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: event.target.email.value,
      }),
    }).then(async (response) => {
      if (response.status === 200) {
        setEmailSent(true);
      } else {
        setEmailError(true);
      }
    });
  };

  return (
    <Layout>
      <div className="m-6 flex justify-center sm:m-auto">
        <div className="m-auto w-full max-w-md rounded-lg bg-white py-8 px-8  shadow ring-1 ring-inset ring-gray-900/10 sm:px-10 ">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h1 className="text-center text-3xl font-bold">
                {!emailSent ? "Let's get your account!" : 'Email Sent!'}
              </h1>
              {emailSent && <p className="mt-2">Please check your email.</p>}
            </div>
            {!emailSent && (
              <>
                <div className="mt-6">
                  <div className="block ">
                    <label
                      for="email"
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

                {emailError && (
                  <p className="mt-2 text-sm text-error">
                    User does not exist.
                  </p>
                )}

                <div className="mt-4">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2"
                    >
                      Continue
                    </button>
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm leading-5 text-gray-700">
                    Already have an account?{' '}
                    <Link
                      className="text-primary-primary hover:text-primary-base font-medium underline transition duration-150 ease-in-out focus:underline focus:outline-none"
                      href="/auth/login"
                    >
                      Log in.
                    </Link>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}
