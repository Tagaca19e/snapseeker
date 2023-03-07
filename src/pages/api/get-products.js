import SerpApi from 'google-search-results-nodejs';

export default async function getResults(req, res) {
  const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);


  try {
    const result = search.json(
      {
        // TODO(etagaca): Make this dynamic.
        // Refer to https://serpapi.com/google-shopping-api.
        engine: 'google_shopping',
        google_domain: 'google.com',
        q: req.query.q,
        location: 'United States',
      },
      (data) => {
        res.status(201).json({ data });
      }
    );
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong with search.' });
  }
}
