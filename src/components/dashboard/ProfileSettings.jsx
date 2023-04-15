import React, { useState } from 'react';

export default function ProfileSettings({ session, user }) {
  const fullName = user.name.split(' ');
  const [firstName, setFirstName] = useState(fullName[0]);
  const [lastName, setLastName] = useState(fullName[1]);
  const [updateNameMessage, setUpdateNameMessage] = useState('');
  const [updatePasswordMessage, setUpdatePasswordMessage] = useState('');

  /**
   * Updates the name of the user.
   * @param {Object} event - Object containint form data.
   */
  const updateName = async (event) => {
    event.preventDefault();
    const response = await fetch('../api/update-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: session.user.email,
        first_name: event.target.first_name.value,
        last_name: event.target.last_name.value,
      }),
    });

    // Replace name displayed in account settings.
    if (response.status === 200) {
      setFirstName(event.target.first_name.value);
      setLastName(event.target.last_name.value);
    }

    const data = await response.json();
    setUpdateNameMessage(data.message);
  };

  /**
   * Updates the password of the user.
   * @param {Object} event - event object containing form data.
   */
  const updatePassword = async (event) => {
    event.preventDefault();

    const response = await fetch('../api/update-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: session.user.email,
        current_password: event.target.current_password.value,
        new_password: event.target.new_password.value,
      }),
    });

    const data = await response.json();
    setUpdatePasswordMessage(data.message);
  };

  return (
    <div className="m-6 h-[80vh]">
      <div className="mx-auto max-w-md py-20 text-center">
        <h1 className="text-5xl font-extrabold">Account settings</h1>
        <p className="mt-4 text-gray-600">
          Manage the name and password associated with your account.
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <div>
          <form onSubmit={updateName}>
            <div className="flex gap-3">
              <div className="w-full">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <input
                  autocomplete="given-name"
                  type="text"
                  name="first_name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="form-input mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <input
                  autocomplete="family-name"
                  type="text"
                  name="last_name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="form-input mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                  required
                />
              </div>
            </div>
            <div className="mt-3 ">
              <button
                type="submit"
                className="mr-5 flex rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white"
              >
                Update name
              </button>
              {updateNameMessage && <p className="mt-3">{updateNameMessage}</p>}
            </div>
          </form>
        </div>

        <div className="mt-11">
          <form onSubmit={updatePassword}>
            <div className="flex w-full flex-col gap-2">
              <label
                htmlFor="current_password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current password
              </label>
              <input
                type="password"
                name="current_password"
                className="form-input mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                required
              />

              <label
                htmlFor="new_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New password
              </label>
              <input
                type="password"
                name="new_password"
                className="form-input mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-3 flex rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white"
            >
              Update password
            </button>
            {updatePasswordMessage && (
              <p className="mt-3">{updatePasswordMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
