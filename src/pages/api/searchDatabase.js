import clientPromise from '../../../lib/mongodb';

export default async function searchData(req, res) {
  // Using the mongodb client, connect to the database.
  const client = await clientPromise;

  // Choose which database you want to use.
  const db = client.db('sample_training');


  const data = await db.collection('routes').aggregate([
        {
            $search: {
                search: {
                  query: req.query.term,
                  path: ["airplane"]
                }
            }
        }, 
        {
          $limit: 20
        }
    ]).toArray()

  // Check for the existence of the user.
//  if (result.length === 0) {
//    return res.status(400).json({ message: 'Password or email is incorrect.' });
//  } else {
//    res.status(200).json({ message: 'User found!' });
//  }
  console.log("data",data);
  res.json(data);
}