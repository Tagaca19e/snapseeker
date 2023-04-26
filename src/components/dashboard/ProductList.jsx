import { BuildingStorefrontIcon, StarIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContextProvider';
import ProductComparisons from './modals/ProductComparisons';
import ProductDetails from './modals/ProductDetails';
import Pagination from './Pagination';

export default function ProductList({
  products,
  onChangePagination,
  savedProductsPage = false,
  userSavedItemIds = [],
}) {
  const router = useRouter();
  const { searchResults, isLoading, setIsLoading } = useContext(AppContext);
  const [currentPagination, setCurrentPagination] = useState({});

  // Set initial state to the products from server-side rendering.
  const [productList, setProductList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [comparisons, setComparisons] = useState([]);
  const [popUpLoading, setPopUpLoading] = useState(false);
  const [savedProductIds, setSavedProductIds] = useState(
    new Set(userSavedItemIds)
  );

  useEffect(() => {
    if (searchResults?.shopping_results?.length && !savedProductsPage) {
      setCurrentPagination(searchResults.serpapi_pagination);
      setProductList(searchResults.shopping_results);
    } else {
      setProductList(products.shopping_results || products);
      setCurrentPagination(products.serpapi_pagination || null);
    }
    setIsLoading(false);
  }, [searchResults]);

  useEffect(() => {
    setProductList(products.shopping_results || products);
    setCurrentPagination(products.serpapi_pagination || null);
    setIsLoading(false);
  }, [products]);

  const user = {
    ...useSession().data?.user,
  };

  /**
   * Deletes a product from the user's saved products in the database.
   * @param {Object} product - Product object to delete.
   */
  const deleteProduct = async (product) => {
    try {
      const res = await fetch('../api/delete-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user.email,
          product_id: product.product_id,
        }),
      });

      const data = await res.json();
      if (savedProductsPage) {
        setProductList(data.updatedUserSavedProducts);
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };

  /**
   * Saves a product to the user's saved products the database.
   * @param {Object} product - Product object to save.
   */
  const saveProduct = async (product) => {
    // Delete product id from products ids that are saved. This enables us to
    // mark the products that are saved on the home page.
    if (savedProductIds.has(product.product_id)) {
      setSavedProductIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.product_id);
        return newSet;
      });

      deleteProduct(product);
    } else {
      try {
        // Track the product ids that are saved.
        setSavedProductIds((prev) => {
          const newSet = new Set(prev);
          newSet.add(product.product_id);
          return newSet;
        });

        fetch('../api/save-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user.email,
            ...product,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getProduct = async (productId) => {
    const res = await fetch(`../api/product-compare?productId=${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  };

  const handleCompare = async (productId) => {
    setIsOpen(true);
    setPopUpLoading(true);

    const res = await getProduct(productId);
    if (res.data) {
      setComparisons(res.data?.sellers_results?.online_sellers);
    }
    setPopUpLoading(false);
  };

  const [openProductModal, setOpenProductModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  /**
   * Opens product modal and fetches the product details.
   * @param {string} productId - Product id to fetch details for.
   * @param {string} productLink - Link for the product.
   */
  const onSelectProduct = async (productId, productLink, product) => {
    setModalLoading(true);
    setOpenProductModal(true);

    console.log('product: ', product);
    const response = await fetch(
      `../api/get-product-details?product_id=${productId}`,
      {
        method: 'GET',
      }
    );

    const data = await response.json();
    setModalLoading(false);
    setProductDetails({
      ...data.productDetails,
      product_link: productLink,
      product_source: product.source,
      product_price: product.price,
    });
  };

  // Callback function for closing the modal.
  const onSetModal = (isOpen) => {
    setOpenProductModal(isOpen);
  };

  return (
    <>
      {/* Popup for showing product comparisons */}
      <ProductComparisons
        popUpLoading={popUpLoading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        comparisons={comparisons}
      />

      {(router.pathname === '/dashboard' ||
        router.pathname === '/saved-items') && (
        <ProductDetails
          productDetails={productDetails}
          open={openProductModal}
          modalLoading={modalLoading}
          onSetModal={onSetModal}
        />
      )}

      <div className="bg-white">
        {!isLoading && (
          <div className="mx-auto max-w-2xl py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-2">
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {productList.length &&
                productList.map((product) => (
                  <div
                    key={product.product_id}
                    className="posit group flex flex-col justify-between"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        onSelectProduct(
                          product.product_id,
                          product.link,
                          product
                        )
                      }
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="mb-3 w-full rounded-md border border-gray-300 object-cover object-center p-3 sm:h-[300px]"
                      />

                      {/* Product infomrmation */}
                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm text-gray-700">
                          {product.title}
                        </h3>

                        <div>
                          <p className="mb-2 text-sm font-medium">
                            {product.price}
                          </p>
                          <span className="flex">
                            <BuildingStorefrontIcon className="mr-2 h-5 text-gray-700" />
                            <p className="text-sm font-bold">
                              {product.source}
                            </p>
                          </span>
                        </div>

                        <p className="mt-1 flex items-center text-sm text-gray-500">
                          <StarIcon className="h-5 text-black" />
                          {product.rating}: {product.reviews} Reviews
                        </p>
                        {product.id}
                      </div>
                    </div>
                    <div className="my-1 flex flex-wrap gap-2 py-2 text-center">
                      <button
                        className={`border-gray mr-3 rounded border py-0.5 px-4 font-bold ${
                          savedProductIds.has(product.product_id)
                            ? 'bg-primary text-white'
                            : 'text-gray-600'
                        }`}
                        onClick={() => saveProduct(product)}
                      >
                        {savedProductsPage ? (
                          <>delete</>
                        ) : (
                          <>
                            {savedProductIds.has(product.product_id)
                              ? 'saved'
                              : 'save'}
                          </>
                        )}
                      </button>
                      {product?.serpapi_product_api_comparisons && (
                        <button
                          onClick={() => handleCompare(product?.product_id)}
                          className="mr-3 rounded bg-[#3bb77e] py-0.5 px-4 font-bold text-white hover:bg-[#3bb77e]/80 "
                        >
                          compare prices
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            {router.pathname === '/dashboard' && (
              <Pagination
                onChangePagination={onChangePagination}
                pagination={currentPagination}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
