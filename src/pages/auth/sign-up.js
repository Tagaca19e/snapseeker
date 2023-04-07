import Router from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/Layout';

export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [display, setDisplay] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [statusCode, setStatusCode] = React.useState(0);
  const [time, setTime] = React.useState(3);

  // Redirect user to login page after 5 seconds.
  useEffect(() => {
    if (time === 0) {
      Router.push('/auth/login');
    }
  });

  /**
   * Displays a message to the user after signup request is complete.
   * @param {string} message - Message to be displayed.
   * @param {number} statusCode - Status code of the response.
   */
  const displayMessage = (message, statusCode) => {
    setDisplay(true);

    // Set the message to be displayed.
    setMessage(message);
    if (statusCode !== 200) {
      setTimeout(() => {
        setDisplay(false);
      }, 5000);
    } else {
      setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
  };

  /**
   * Validates the user's input and sends a request to MongoDB server to create
   * a new user.
   */
  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page.
    setButtonDisabled(true); // Disabled the button to prevent multiple clicks.
    setLoading(true); // Set loading to true to display loading message.

    try {
      fetch('../api/auth/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: event.target.first_name.value,
          last_name: event.target.last_name.value,
          email: event.target.email.value,
          password: event.target.password.value,
        }),
      }).then(async (response) => {
        let data = await response.json();
        setStatusCode(response.status);
        displayMessage(data.message, response.status);
      });
    } catch (error) {
      console.error('error: ', error);
    }

    // Set loading to false and enable register button
    setLoading(false);
    setButtonDisabled(false);
  };

  return (
    <Layout>
      <div className="m-auto flex justify-center">
        <div className="m-auto bg-white py-8 px-8 shadow only:max-w-xl sm:rounded-lg sm:px-10">
          <form onSubmit={handleSignUp}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <div className="block ">
                  <label
                    htmlFor="first_name"
                    className="block items-center text-sm font-medium leading-5 text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    autocomplete="given-name"
                    placeholder="First Name"
                    type="text"
                    name="first_name"
                    className="form-input mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                    required
                  />
                </div>
              </div>

              <div className="col-span-1">
                <div className="block">
                  <label
                    htmlFor="last_name"
                    className=" block items-center text-sm font-medium leading-5 text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    autocomplete="family-name"
                    placeholder="Last Name"
                    type="text"
                    name="last_name"
                    className="form-input mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                    required
                  />
                </div>
              </div>
            </div>

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

            <div className="mt-4">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2"
                  disabled={buttonDisabled}
                >
                  {loading ? 'Loading...' : 'Register'}
                </button>
                {display && (
                  <p
                    className={`mt-2 rounded-md border p-1 text-center ${
                      statusCode === 200
                        ? 'border-primary text-primary'
                        : 'bg-error_light text-error'
                    }`}
                  >
                    {message}
                    {statusCode === 200 && <p>Redirecting in {time}</p>}
                  </p>
                )}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm leading-5 text-gray-700">
                Already have an account?{' '}
                <a
                  className="text-primary-primary hover:text-primary-base font-medium underline transition duration-150 ease-in-out focus:underline focus:outline-none"
                  href="/auth/login"
                >
                  Log in.
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
