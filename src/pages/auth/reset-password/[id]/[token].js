import React from 'react';
import { useRouter } from 'next/router';

export default function token({ expiredToken }) {
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordSuccess, setPasswordSuccess] = React.useState(false);

  // Used to check current url.
  const router = useRouter();
  const { id, token } = router.query;

  const handleSubmit = async (event) => {
    event.preventDefault();
    let password = event.target.password.value;
    let newPassword = event.target.confirm_password.value;

    // Check if the passwords match.
    if (password !== newPassword) {
      setPasswordError(true);
    }

    fetch('../../../api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        token: token,
        password: password,
        new_password: newPassword,
      }),
    }).then(async (response) => {
      console.log(await response.text());
      if (response.status === 200) {
        setPasswordSuccess(true);
      }
    });
  };

  return (
    <div className="m-auto flex min-h-screen justify-center">
      {!expiredToken ? (
        <div className="m-auto w-full max-w-md bg-white py-8 px-8 shadow  sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h1 className="text-3xl font-bold">Reset your password</h1>
              <p className="mt-3">
                Enter a new password to reset your account.
              </p>
            </div>

            <div className="mt-6">
              <div className="block ">
                <label
                  for="password"
                  className="block items-center text-sm font-medium leading-5 text-gray-700"
                >
                  Password
                </label>
                <input
                  autocomplete="new-password"
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  className="form-input focus:ring-primary-lightest focus:border-primary-base mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="block ">
                <label
                  for="confirm_password"
                  className="block items-center text-sm font-medium leading-5 text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  autocomplete="new-password"
                  placeholder="Enter Password"
                  type="password"
                  name="confirm_password"
                  className="form-input focus:ring-primary-lightest focus:border-primary-base mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                  required
                />
              </div>
            </div>

            {passwordError && !passwordSuccess && (
              <p className="mt-2 text-sm text-red-500">
                Passwords do not match
              </p>
            )}

            {passwordSuccess && (
              <p className="mt-2 text-sm text-cyan-800">
                Password success! You may now log in.
              </p>
            )}

            <div className="mt-4">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="hover:bg-primary-dark focus:ring-primary-light focus:border-primary-darkest active:bg-primary-darkest flex w-full justify-center rounded-md border border-transparent bg-cyan-800 py-2 px-4 text-sm font-medium text-white transition duration-150 ease-in-out focus:outline-none focus:ring-4"
                >
                  Reset Password
                </button>
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm leading-5 text-gray-700">
                Don't have an account?{' '}
                <a
                  className="text-primary-dark hover:text-primary-base font-medium underline transition duration-150 ease-in-out focus:underline focus:outline-none"
                  href="/auth/sign-up"
                >
                  Register.
                </a>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <p>
          Link expired. Please request a new password reset link.{' '}
          <a href="/auth/forgot" className="underline">Forgot password.</a>
        </p>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Validate token first before rendering the sent reset password page.
  const { id, token } = context.query;
  const expiredToken = await fetch(
    `${process.env.DOMAIN}/api/auth/validate-token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        token: token,
      }),
    }
  ).then(async (response) => {
    return response.status === 401 ? true : false;
  });

  return {
    props: { expiredToken: expiredToken },
  };
}
