import { Disclosure, Menu, Transition } from '@headlessui/react';
import { CameraIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContextProvider';

let navigation = [
  { name: 'Home', href: '/dashboard', current: false },
  { name: 'Saved', href: '/saved-items', current: false },
];

const userNavigation = [
  { name: 'Account', href: '/account', onClick: {} },
  { name: 'Sign out', href: '#', onClick: () => signOut() },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const router = useRouter();

  // Track which navigation item is currently selected.
  navigation = navigation.map((nav) => {
    if (nav.href === router.pathname) {
      nav.current = true;
    } else {
      nav.current = false;
    }
    return nav;
  });

  const { setSearchResults, setOpenCamera, setIsLoading } =
    useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [hideAutoCompleteResults, setHideAutoCompleteResults] = useState(true);

  const user = {
    ...useSession().data?.user,
  };

  /**
   * Searches for products based on the search term.
   * @param {string} searchTerm - Term to search for.
   */
  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setSearchTerm(searchTerm);

    // Hide autocomplete results but keep track of autocomplete results.
    setHideAutoCompleteResults(true);

    const res = await fetch('/api/list-products', {
      method: 'POST',
      body: searchTerm,
    });

    const searchResults = await res.json();
    setSearchResults(searchResults.data);
  };

  /**
   * Displays matching autocomplete results based on the search term.
   * @param {string} searchTerm - Term to search for.
   */
  const handleAutoComplete = async (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm) {
      setHideAutoCompleteResults(true);
      setAutoCompleteResults([]);
      return;
    }

    const res = await fetch('../api/autocomplete', {
      method: 'POST',
      body: searchTerm,
    });

    const data = await res.json();
    console.log('data: ', data);
    setAutoCompleteResults(data.relatedSearches || []);
    setHideAutoCompleteResults(false);
  };

  /* Closes autocomplete results when user clicks outside of the search bar or
   * autocomplete results div. */
  const closeAutoCompleteResults = (event) => {
    if (
      (event.target.id !== 'autocomplete-result' &&
        event.target.name !== 'search' &&
        !hideAutoCompleteResults) ||
      (!event.target.id && !event.target.name)
    ) {
      setHideAutoCompleteResults(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeAutoCompleteResults);
    return () => {
      document.removeEventListener('click', closeAutoCompleteResults);
    };
  }, []);

  return (
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto mb-1 max-w-7xl px-2 lg:divide-y lg:divide-gray-200">
            <div className="relative flex h-16 justify-between">
              <div className="relative z-10 flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <img
                      className="w-autof block h-12 rounded-md"
                      src="/logos/logo.svg"
                      alt="Snapseeker"
                    />
                  </Link>
                </div>
              </div>

              {router.pathname === '/dashboard' && (
                <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                  <div className="relative w-full sm:max-w-xs">
                    <div className="flex">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      {/* Search bar */}
                      <div className="relative w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              handleSearch(event.target.value);
                            }
                          }}
                          onFocus={() => setHideAutoCompleteResults(false)}
                          value={searchTerm}
                          autoComplete="off"
                          onChange={(event) => {
                            handleAutoComplete(event.target.value);
                          }}
                          name="search"
                          className="block w-full rounded-l-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                      <button
                        type="button"
                        className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => setOpenCamera(true)}
                      >
                        <CameraIcon
                          className="-ml-0.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    {/* Autocomplete suggestions */}
                    {autoCompleteResults.length > 0 &&
                      !hideAutoCompleteResults && (
                        <div className="absolute z-10 w-full gap-2 rounded-md border border-gray-300 bg-white sm:max-w-xs">
                          {autoCompleteResults.length &&
                            autoCompleteResults.map((suggestedSearch) => (
                              <p
                                id="autocomplete-result"
                                key={suggestedSearch.text}
                                onClick={() => {
                                  handleSearch(suggestedSearch.text);
                                }}
                                className="cursor-pointer px-2 pt-1"
                              >
                                {suggestedSearch.text}
                              </p>
                            ))}
                        </div>
                      )}
                  </div>
                </div>
              )}

              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full  bg-primary text-xl text-white">
                        <a>{user.name.split('')[0]}</a>
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block py-2 px-4 text-sm text-gray-700'
                              )}
                              onClick={item.onClick}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <nav
              className="hidden lg:flex lg:space-x-8 lg:py-2"
              aria-label="Global"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                    'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                    'block rounded-md py-2 px-3 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full  bg-primary text-xl text-white">
                    <a>{user.name.split('')[0]}</a>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    onClick={item.onClick}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
