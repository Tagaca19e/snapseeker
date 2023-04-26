import SerpApi from 'google-search-results-nodejs';

export default async function getProductDetails(req, res) {
  const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);

  const params = {
    engine: 'google_product',
    google_domain: 'google.com',
    product_id: req.query.product_id,
    gl: 'us',
    hl: 'en',
  };

  const callback = function (data) {
    res.status(200).json({ productDetails: data });
  };

  // Show result as JSON
  search.json(params, callback);
}
