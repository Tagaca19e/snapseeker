import PopUpContainer from './PopUpContainer';
import { Dialog } from '@headlessui/react';
export default function PopUp({
  isOpen,
  setIsOpen,
  popUpLoading,
  comparisons,
}) {
  // Create a Map to keep track of the lowest price for each item
  const lowestPrices = new Map();

  // Loop through each item in the array
  for (const item of comparisons) {
    // If the item doesn't have a price, skip it
    if (!item.total_price) {
      continue;
    }

    // If the item is not already in the Map or its price is lower than the current lowest price, update the Map
    lowestPrices.set(item.name, item.total_price);
  }

  const filteredItems = Array.from(lowestPrices, ([name, total_price]) => ({
    name,
    total_price,
  }));

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
          <div className="mt-3 max-h-[300px] overflow-y-scroll px-6">
            <ul>
              {filteredItems?.map((company) => (
                <li
                  key={company.position}
                  className="flex justify-between border-b border-gray-200 py-3"
                >
                  <h3>{company.name}</h3>

                  <h6>{company.total_price}</h6>
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
