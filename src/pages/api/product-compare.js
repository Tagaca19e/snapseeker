import SerpApi from 'google-search-results-nodejs';

export default async function getResults(req, res) {
  const productId = req.query?.productId;
  const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);
  try {
    search.json(
      {
        engine: 'google_product',
        google_domain: 'google.com',
        product_id: productId,
        offers: '1',
        hl: 'en',
        gl: 'us',

      },
      (data) => {
        /* @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201 */
        res.status(201).json({ data });
      }
    );
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong with search.' });
  }
}
