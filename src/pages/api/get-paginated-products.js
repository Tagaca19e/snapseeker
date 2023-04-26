import fetch from 'node-fetch';

export default async function getPaginedProducts(req, res) {
  try {
    const response = await fetch(
      req.body.url + '&api_key=' + process.env.SERP_API_KEY
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}
