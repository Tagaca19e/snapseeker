import { parseImage } from './parseImage';

/**
 * Uploads file to cloudflare R2 bucket and parses image url and return
 * products that match the image.
 * @param {string} base64File - Base64 encoded file.
 * @returns {Promise} - Promise object with SERP API results.
 * @see https://serpapi.com/google-shopping-api
 */
export function uploadFile(base64File) {
  return new Promise(async (resolve, reject) => {
    const file = await fetch(base64File).then((res) =>
      res.blob().then((blob) => {
        return new File([blob], 'test.jpg', { type: 'image/jpeg' });
      })
    );

    // Upload image to cloudflare R2 bucket using worker.
    // R2: https://developers.cloudflare.com/r2/
    // Workers: https://developers.cloudflare.com/workers/
    const res = await fetch(
      'https://snapseeker-image-uploader.etagaca.workers.dev/',
      {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: file,
      }
    );

    // Get public url of image.
    const imageUrl = await res.text();
    if (res.status === 200) {
      const products = await parseImage(imageUrl);
      resolve(products);
    } else {
      reject('Something went wrong with uploading image');
    }
  });
}
