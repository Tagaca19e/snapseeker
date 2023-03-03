import clientPromise from '../../../lib/mongodb';

export default async function searchData(req, res) {
  // Using the mongodb client, connect to the database.
  const client = await clientPromise;
  // Choose which database you want to use.
  const db = client.db('snapseeker');

  const data = await db.collection('sample_data').aggregate([
    {
      $search: {
        search: {
          query: req.query.term,
          path: ["item"]
        }
      }
    },
    {
      $limit: 20
    }
  ]).toArray()

  res.json(data);
}