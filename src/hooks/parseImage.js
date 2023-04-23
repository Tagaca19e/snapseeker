/**
 * Parses image url and return products that match the image.
 * @param {string} imageUrl - Public url of image to parse.
 * @returns {Promise} - Promise object with SERP API results.
 * @see https://serpapi.com/google-shopping-api
 */
export async function parseImage(imageUrl) {
  return new Promise(async (resolve, reject) => {
    // Get product name from image.
    const res = await fetch('/api/parse-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: imageUrl,
      }),
    });

    if (res.status === 200) {
      const imageResult = await res.json();
      // Get products from product name.
      const productRes = await fetch('/api/list-products', {
        method: 'POST',
        body: imageResult.data.visual_matches[0].title,
      });

      const products = await productRes.json();
      resolve(products);
    } else {
      reject('Something went wrong with parsing image');
    }
  });
}
