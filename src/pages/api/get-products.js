import SerpApi from 'google-search-results-nodejs';

export default async function getResults(req, res) {
  if (req.method === 'GET') {
    res.status(400).json({ message: 'Invalid request method' });
    return;
  }

  const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);
  try {
    search.json(
      {
        engine: 'google_shopping',
        google_domain: 'google.com',
        q: req.body.query,
        location: 'United States',
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
