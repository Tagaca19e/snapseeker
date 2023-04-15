import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useContext, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { uploadFile } from '../../hooks/uploadFile';
import { AppContext } from '../AppContextProvider';

export default function CameraUpload({ isMobileView }) {
  const webCamHeigth = isMobileView ? 200 : 500;

  // Use front facing camera on mobile devices.
  const mobileConstraints = {
    facingMode: { exact: 'environment' },
    height: webCamHeigth,
  };

  const { setSearchResults, openCamera, setOpenCamera, setIsLoading } =
    useContext(AppContext);

  const [captured, setCaptured] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  const cancelButtonRef = useRef(null);
  const webCamRef = useRef(null);

  const cameraReset = () => {
    setCaptured(false);
    setImgSrc(null);
    setOpenCamera(false);
  };

  const capture = useCallback(async () => {
    const imageSrc = webCamRef.current.getScreenshot();
    setCaptured(true);
    setImgSrc(imageSrc);
    cameraReset();
    setIsLoading(true);

    const products = await uploadFile(imageSrc);

    // TODO(etagaca): Handle rejection in promise.
    setSearchResults(products.data.shopping_results);
    setIsLoading(false);
  }, [webCamRef, setImgSrc]);

  return (
    <Transition.Root show={openCamera} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={cameraReset}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Image Search
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please be aware that all images are being stored in a
                        public bucket storage. Do not upload any sensitive
                        information.
                      </p>
                      <div className="py-2">
                        {!captured ? (
                          <Webcam
                            ref={webCamRef}
                            screenshotFormat="image/jpeg"
                            style={{ width: '100%' }}
                            videoConstraints={
                              isMobileView ? mobileConstraints : null
                            }
                          />
                        ) : (
                          <img src={imgSrc} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:col-start-2"
                    onClick={capture}
                  >
                    Capture
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={cameraReset}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
