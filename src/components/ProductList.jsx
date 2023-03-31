import { useEffect, useContext, useState } from 'react';
import { AppContext } from './AppContextProvider';
import { useSession } from 'next-auth/react';
import PopUp from './PopUp';

export default function ProductList({ products }) {
  // Set initial state to the products from server-side rendering.
  const [productList, setProductList] = useState(
    products.data.shopping_results
  );
  const { searchResults, isLoading } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [comparisons, setComparisons] = useState([]);
  const [popUpLoading, setPopUpLoading] = useState(false);

  useEffect(() => {
    if (searchResults.length) {
      setProductList(searchResults);
    }
  }, [searchResults, isLoading]);

  // console.log(productList)
  const user = {
    ...useSession().data?.user,
  };

  const saveProduct = async (product) => {
    try {
      fetch('http://localhost:3000/api/save-prodducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.email,
          item_link: product.link,
          item_thumbnail: product.thumbnail,
          item_title: product.title,
          item_rating: product.rating,
          item_price: product.price,
        }),
      }).then(async (response) => {
        let data = await response.json();
        alert(data.message);
        console.log(response.status);
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };

  const getProduct = async (productId) => {
    const url = process.env.NEXT_PUBLIC_DOMAIN;
    const res = await fetch(
      `${url}/api/product-compare?productId=${productId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    return data;
  };

  const handleCompare = async (productId) => {

    setIsOpen(true);
    setPopUpLoading(true);
    const res = await getProduct(productId);
    console.log(res)
    if (res.data) {
      setComparisons(res.data?.sellers_results?.online_sellers);
    }
    setPopUpLoading(false);
  };

  return (
    <>
      {/* popup for showing product comparisons */}
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
                    className="group relative"
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
                    <div class="my-1 flex flex-wrap justify-center gap-2 py-6 text-center">
                      <button
                        class="mr-3 rounded bg-blue-600 py-0.5 px-4 font-bold text-white hover:bg-blue-700"
                        onClick={() => saveProduct(product)}
                      >
                        Save
                      </button>
                      {product?.serpapi_product_api_comparisons && <button
                        onClick={() => handleCompare(product?.product_id)}
                        class="mr-3 rounded bg-[#3bb77e] 
                    py-0.5 px-4 font-bold text-white hover:bg-[#3bb77e]/80 "
                      >
                        Compare prices
                      </button>}
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
