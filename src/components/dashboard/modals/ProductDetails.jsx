import { Dialog, Tab, Transition } from '@headlessui/react';
import {
  ArrowUturnLeftIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  RocketLaunchIcon,
  StarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import ProductDetailsLoader from '../loaders/ProductDetails';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductModal({
  productDetails,
  open,
  modalLoading,
  onSetModal,
}) {
  const [speakSpeechSynthesisSpeaking, setSpeakSpeechSynthesisSpeaking] =
    useState(false);

  let msg;
  function speakSpeechSynthesis(text) {
    msg = new SpeechSynthesisUtterance(text);
    msg.lang = `en-US`;
    msg.rate = 0.9;
    msg.volume = 1;

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    } else {
      window.speechSynthesis.speak(msg);
    }

    // Register an event listener to handle the end of the speech
    msg.addEventListener('end', () => {
      setSpeakSpeechSynthesisSpeaking(false);
    });

    setSpeakSpeechSynthesisSpeaking(true);
  }

  function pauseSpeechSynthesis() {
    window.speechSynthesis.pause();
    setSpeakSpeechSynthesisSpeaking(false);
  }

  function restartSpeechSynthesis(text) {
    window.speechSynthesis.cancel();
    speakSpeechSynthesis(text);
  }

  function closeSpeechSynthesis() {
    window.speechSynthesis.cancel();
    setSpeakSpeechSynthesisSpeaking(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          onSetModal(false);
          closeSpeechSynthesis();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            {modalLoading ? (
              <ProductDetailsLoader />
            ) : (
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => {
                        onSetModal(false);
                        closeSpeechSynthesis();
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {productDetails?.error ? (
                      <div className="m-auto flex items-center justify-between">
                        <p>We couldn't find any details about the product :(</p>
                        <a
                          href={productDetails?.product_link}
                          target="_blank"
                          className="ml-4 w-max rounded-lg bg-primary p-3 text-sm text-white"
                        >
                          Go to the store
                        </a>
                      </div>
                    ) : (
                      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                        <div className="sm:col-span-4 lg:col-span-5">
                          {/* Image gallery */}
                          <Tab.Group as="div" className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="mx-auto mt-6 w-full max-w-2xl lg:max-w-none">
                              <Tab.List className="grid grid-cols-4 gap-6">
                                {productDetails?.product_results?.media.map(
                                  (image) => (
                                    <Tab
                                      key={image.link}
                                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md"
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span className="sr-only">
                                            Product Image
                                          </span>
                                          <span className="absolute inset-0 overflow-hidden rounded-md">
                                            <img
                                              src={image.link}
                                              alt="Product Image"
                                              className="h-full w-full object-cover object-center"
                                            />
                                          </span>
                                          <span
                                            className={classNames(
                                              selected
                                                ? 'ring-primary'
                                                : 'ring-transparent',
                                              'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                            )}
                                            aria-hidden="true"
                                          />
                                        </>
                                      )}
                                    </Tab>
                                  )
                                )}
                              </Tab.List>
                            </div>

                            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                              {productDetails?.product_results?.media.map(
                                (image) => (
                                  <Tab.Panel key={image.link}>
                                    <img
                                      src={image.link}
                                      alt="Product Image"
                                      className="h-full w-full object-cover object-center sm:rounded-lg"
                                    />
                                  </Tab.Panel>
                                )
                              )}
                            </Tab.Panels>
                          </Tab.Group>
                        </div>
                        <div className="sm:col-span-8 lg:col-span-7">
                          <h2 className="sr-only">
                            {productDetails?.product_results?.title || ''}
                          </h2>
                          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                            {productDetails?.product_results?.title || ''}
                          </h2>

                          <div className="mt-3">
                            <p className="text-2xl text-gray-900">
                              {productDetails?.product_price} at{' '}
                              {productDetails?.product_source}
                            </p>

                            {/* Reviews */}
                            <div className="mt-3">
                              <h4 className="sr-only">Reviews</h4>
                              <div className="flex items-center">
                                <div className="flex items-center">
                                  <StarIcon className="h-5 w-5 flex-shrink-0" />
                                </div>
                                <p className="mr-1">
                                  {productDetails?.product_results?.rating || 0}{' '}
                                  out of 5 stars
                                </p>
                                <p>
                                  ({productDetails?.product_results?.reviews})
                                </p>
                              </div>
                            </div>

                            <div className="mt-6">
                              <h4 className="sr-only">Description</h4>
                              <h3 id="information-heading" className="sr-only">
                                {productDetails?.product_results?.description ||
                                  'No description'}
                              </h3>

                              {speakSpeechSynthesisSpeaking ? (
                                <div className="flex items-center gap-2">
                                  <PauseCircleIcon
                                    onClick={() => pauseSpeechSynthesis()}
                                    className="h-7 w-7 cursor-pointer"
                                  />
                                  <ArrowUturnLeftIcon
                                    onClick={() =>
                                      restartSpeechSynthesis(
                                        productDetails?.product_results
                                          ?.description || 'No description'
                                      )
                                    }
                                    className="h-6 w-6 cursor-pointer"
                                  />
                                </div>
                              ) : (
                                <>
                                  <PlayCircleIcon
                                    onClick={() =>
                                      speakSpeechSynthesis(
                                        productDetails?.product_results
                                          ?.description || 'No description'
                                      )
                                    }
                                    className="h-7 w-7 cursor-pointer"
                                  />
                                </>
                              )}
                              <p className="text-sm">
                                {productDetails?.product_results?.description ||
                                  'No description'}
                              </p>
                              <p className="mt-4 w-max rounded-lg bg-primary p-3 text-sm text-white">
                                <a
                                  href={productDetails?.product_link}
                                  target="_blank"
                                >
                                  Go to the store
                                </a>
                              </p>
                            </div>
                          </div>

                          <div className="mt-6">
                            <h3 id="options-heading" className="sr-only">
                              Product Highlights
                            </h3>

                            {productDetails?.product_results?.extensions && (
                              <div className="mt-6">
                                <h4 className="sr-only">Highlights</h4>
                                <div className="flex flex-wrap gap-2">
                                  {productDetails?.product_results?.extensions.map(
                                    (highlight) => (
                                      <>
                                        <span
                                          key={highlight + 'sr'}
                                          className="sr-only"
                                        >
                                          {highlight}
                                        </span>
                                        <span
                                          key={highlight}
                                          className="w-max rounded-full border border-gray-300 p-2"
                                        >
                                          {highlight}
                                        </span>
                                      </>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {productDetails?.reviews_results?.reviews && (
                            <div className="mt-6">
                              <h3 className="text-lg font-bold">
                                <span className="flex items-center">
                                  <RocketLaunchIcon className="mr-1 h-5 w-5" />{' '}
                                  Highlighted Review
                                </span>
                              </h3>
                              <h3 id="options-heading" className="sr-only">
                                Highlighted Review
                              </h3>

                              <div className="mt-3">
                                {productDetails?.reviews_results?.reviews.map(
                                  (review) => (
                                    <div key={review.position}>
                                      <h1 className="sr-only">
                                        {review.source.split('·')[0]}
                                      </h1>
                                      <h1 className="mb-1">
                                        {review.source.split('·')[0]}
                                      </h1>

                                      <h3 className="sr-only">{review.date}</h3>
                                      <h3 className="mb-2 text-xs">
                                        {review.date}
                                      </h3>

                                      <h3 className="sr-only">
                                        {review.content}
                                      </h3>
                                      <p className="text-sm">
                                        {review.content}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            )}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
