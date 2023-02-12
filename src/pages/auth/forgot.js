import React from 'react';

export default function forgot() {
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
      // Check for the status of the response.
      console.log(response);
      let data = await response.json();
      console.log(data);
    });
  };

  return (
    <div className="m-auto flex min-h-screen justify-center">
      <div className="m-auto w-full max-w-md bg-white py-8 px-8 shadow  sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-3xl font-bold">
            Let's get your account!
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

          <div className="mt-4">
            <span className="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                className="hover:bg-primary-dark focus:ring-primary-light focus:border-primary-darkest active:bg-primary-darkest flex w-full justify-center rounded-md border border-transparent bg-cyan-800 py-2 px-4 text-sm font-medium text-white transition duration-150 ease-in-out focus:outline-none focus:ring-4"
              >
                Continue
              </button>
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm leading-5 text-gray-700">
              Already have an account?{' '}
              <a
                className="text-primary-dark hover:text-primary-base font-medium underline transition duration-150 ease-in-out focus:underline focus:outline-none"
                href="/auth/login"
              >
                Log in.
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
