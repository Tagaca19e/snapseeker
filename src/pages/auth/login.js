import React from 'react';
import Router from 'next/router';

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

  // TODO(etagaca): Validate sessions for logging in, perssistent sessions.
  /**
   * Validates the user's input and sends a request to MongoDB server to
   * validate user credentials.
   */
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page.
    setButtonDisabled(true); // Disabled the button to prevent multiple clicks.
    setLoading(true); // Set loading to true to display loading message.

    try {
      fetch('../api/validate-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value,
        }),
      }).then(async (response) => {
        if (response.status === 200) {
          Router.push('/dashboard');
        } else {
          let data = await response.json();
          displayError(data.message);
        }
      });
    } catch (error) {
      console.error('error: ', error);
    }

    // Set loading to false and enable the button.
    setLoading(false);
    setButtonDisabled(false);
  };

  return (
    <div className="m-auto flex min-h-screen justify-center">
      <div className="m-auto w-full max-w-md bg-white py-8 px-8 shadow  sm:rounded-lg sm:px-10">
        <form onSubmit={handleLogin}>
          <h1 className="text-center text-3xl font-bold">
            Let's get you saving!
          </h1>

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
                className="form-input focus:ring-primary-lightest focus:border-primary-base mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="block ">
              <label
                for="password"
                className=" block items-center text-sm font-medium leading-5 text-gray-700"
              >
                Password
              </label>
              <input
                autocomplete="new-password"
                placeholder="Password"
                type="password"
                name="password"
                className="form-input focus:ring-primary-lightest focus:border-primary-base mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                required
              />
            </div>
          </div>

          <div className="mt-4 text-sm font-semibold text-cyan-800">
            <a href="/auth/forgot">Forgot your password?</a>
          </div>

          <div className="mt-4">
            <span className="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                className="hover:bg-primary-dark focus:ring-primary-light focus:border-primary-darkest active:bg-primary-darkest flex w-full justify-center rounded-md border border-transparent bg-cyan-800 py-2 px-4 text-sm font-medium text-white transition duration-150 ease-in-out focus:outline-none focus:ring-4"
                disabled={buttonDisabled}
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
              {error && (
                <p className="mt-2 rounded-md border bg-red-100 p-1 text-center text-red-500">
                  {message}
                </p>
              )}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm leading-5 text-gray-700">
              Already have an account?{' '}
              <a
                className="text-primary-dark hover:text-primary-base font-medium underline transition duration-150 ease-in-out focus:underline focus:outline-none"
                href="/auth/sign-up"
              >
                Sign up.
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
