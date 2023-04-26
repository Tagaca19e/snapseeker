import { BuildingStorefrontIcon } from '@heroicons/react/20/solid';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import PopUpContainer from './PopUpContainer';

export default function PopUp({
  isOpen,
  setIsOpen,
  popUpLoading,
  comparisons,
}) {
  // Create a hashmap to keep track of lowest price and link for each item.
  const lowestPrices = {};

  // Loop through each item in comparisons array, there may be multipe stores
  // that offer the same item.
  for (const item of comparisons) {
    // If the item doesn't have a price, skip it.
    if (!item.total_price) {
      continue;
    }

    // If item is not already in hashmap or its price is lower than current
    // lowest price, update the hashmap.
    if (!(item.name in lowestPrices)) {
      lowestPrices[item.name] = item;
    } else if (item.total_price < lowestPrices[item.name].total_price) {
      lowestPrices[item.name].total_price = item.total_price;
    }
  }
  const filteredItems = Object.values(lowestPrices);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <PopUpContainer isOpen={isOpen} closeModal={closeModal}>
      <div
        className="my-8 inline-block w-full max-w-lg 
      transform overflow-hidden rounded-2xl bg-white 
      text-left align-middle shadow-xl transition-all "
      >
        <div className="border-b border-gray-400  px-6 py-6 ">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Product Comparisons
          </Dialog.Title>
        </div>

        {popUpLoading ? (
          <div className="mt-3 px-6">Loading...</div>
        ) : (
          <div className="mt-3 max-h-[300px] overflow-y-auto px-6">
            <ul>
              {filteredItems?.map((company) => (
                <li
                  key={company.position}
                  className="cursor-pointer  border-b border-gray-200 py-3"
                >
                  <Link
                    href={company.link}
                    target="blank"
                    className="flex justify-between"
                  >
                    <span className="flex items-center gap-3">
                      <BuildingStorefrontIcon className="h-5 w-5 text-gray-400" />
                      <h3>{company.name}</h3>
                    </span>
                    <h6>{company.total_price}</h6>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* close btn */}
        <div className="mt-4 px-6 pb-6">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm text-red-900 duration-300 hover:bg-red-200"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </PopUpContainer>
  );
}
