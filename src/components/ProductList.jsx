import { useEffect, useContext, useState } from 'react';
import { AppContext } from './AppContextProvider';
import { useSession } from 'next-auth/react';
import PopUp from './PopUp';

export default function ProductList({
  products,
  savedProductsPage = false,
  userSavedItemIds = [],
}) {
  const { searchResults, isLoading } = useContext(AppContext);

  // Set initial state to the products from server-side rendering.
  const [productList, setProductList] = useState(products);
  const [isOpen, setIsOpen] = useState(false);
  const [comparisons, setComparisons] = useState([]);
  const [popUpLoading, setPopUpLoading] = useState(false);
  const [savedProductIds, setSavedProductIds] = useState(
    new Set(userSavedItemIds)
  );

  useEffect(() => {
    if (searchResults.length) {
      setProductList(searchResults);
    }
  }, [searchResults, isLoading]);

  const user = {
    ...useSession().data?.user,
  };

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

  const saveProduct = async (product) => {
    if (savedProductIds.has(product.product_id)) {
      setSavedProductIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.product_id);
        return newSet;
      });

      deleteProduct(product);
    } else {
      try {
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
        }).then(async (response) => {
          const data = await response.json();
          console.log('res save product: ', data);
        });
      } catch (error) {
        console.error('error: ', error);
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

  return (
    <>
      {/* Popup for showing product comparisons */}
      <PopUp
        popUpLoading={popUpLoading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        comparisons={comparisons}
      />

      <div className="bg-white">
        {!isLoading && (
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-2">
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {productList &&
                productList.map((product) => (
                  <div
                    key={product.position}
                    href={product.link}
                    className="group relative flex flex-col justify-between"
                  >
                    <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href={product.link} target="_blank">
                            {product.title}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.rating}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.price}
                      </p>
                    </div>
                    <div class="my-1 flex flex-wrap gap-2 py-6 text-center">
                      <button
                        class={`border-gray mr-3 rounded border py-0.5 px-4 font-bold ${
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
                          class="mr-3 rounded bg-[#3bb77e] 
                    py-0.5 px-4 font-bold text-white hover:bg-[#3bb77e]/80 "
                        >
                          compare prices
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
