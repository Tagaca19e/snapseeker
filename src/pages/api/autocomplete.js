import SerpApi from 'google-search-results-nodejs';

export default async function (req, res) {
  const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);

  const params = {
    engine: 'google_autocomplete',
    q: req.body,
  };

  const callback = function (data) {
    res.status(200).json({ results: data.suggestions });
  };

  // Show result as JSON.
  search.json(params, callback);
}
