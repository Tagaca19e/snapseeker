import SerpApi from 'google-search-results-nodejs';

export default async function (req, res) {
  const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);
  const params = {
    engine: 'google',
    q: req.body,
    location: 'United States',
    google_domain: 'google.com',
    gl: 'us',
    hl: 'en',
    tbm: 'shop',
    safe: 'active',
    device: 'mobile',
  };

  const callback = function (data) {
    const relatedSearches = data['people_also_search_for'];
    res.status(200).json({ relatedSearches });
  };

  search.json(params, callback);
}
