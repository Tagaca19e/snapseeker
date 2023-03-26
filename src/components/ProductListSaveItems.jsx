import { useEffect, useContext, useState } from 'react';
import { AppContext } from './AppContextProvider';
import { useSession } from 'next-auth/react';



export default function ProductList({ products }) {
  // Set initial state to the products from server-side rendering.
  const [productList, setProductList] = useState(
    products);
  
  const { searchResults, isLoading } = useContext(AppContext);

  useEffect(() => {
    if (searchResults.length) {
      setProductList(searchResults);
    }
  }, [searchResults, isLoading]);

  const user = {
    ...useSession().data?.user
  }

//   const saveProduct = async (product) => {
//     try {
//      fetch('http://localhost:3000/api/save-prodducts',{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         user_id: user.email,
//         item_link: product.link,
//         item_thumbnail: product.thumbnail,
//         item_title: product.title,
//         item_rating: product.rating,
//         item_price: product.price,
//       }),
//     }).then(async (response) => {
//       let data = await response.json();
//       alert(data.message)
//       console.log(response.status);
//     });
//     }catch (error) {
//       console.error('error: ', error);
//     }
//   }

  return (
    <div className="bg-white">
      {!isLoading && (
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-2">
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {productList &&
              productList.map((product) => (
                <div
                  key={product._id}
                  href={product.product_link}
                  className="group relative"
                >
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={product.product_thumbnail}
                      alt={product.product_title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.product_link} target="_blank">

                          {product.product_title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.product_rating}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.product_price}
                    </p>
                  </div>
                  <div className="text-center py-6 my-1">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-0.5 px-4 mr-3 rounded"
                      >
                        Delete
                      </button>
                    </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}