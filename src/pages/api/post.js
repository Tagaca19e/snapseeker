import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  // Using the mongodb client, connect to the database.
  const client = await clientPromise;

  // Choose which database you want to use.
  const db = client.db('snapseeker');

  switch (req.method) {
    case 'POST':
      let bodyObject = JSON.parse(req.body);

      // Insert the user into the database.
      let users = await db.collection('users').insertOne(bodyObject);
      res.json(users.ops[0]);
      break;

    case 'GET':
      const USERS = await db.collection('users').find({}).toArray();
      res.json({ status: 200, data: USERS });
      break;
  }
}
