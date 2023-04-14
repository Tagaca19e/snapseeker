import clientPromise from '/lib/mongodb';

export default async function saveData(req, res) {
  try {
    // Use mongodb client to connect to the database.
    const client = await clientPromise;
    const db = client.db('snapseeker');

    // Check if item already exists.
    const item = await db
      .collection('save_items')
      .find({ user: req.body.user, product_id: req.body.product_id })
      .toArray();

    if (item.length > 0) {
      return res.status(409).json({ message: 'item already exists' });
    }

    await db.collection('save_items').insertOne(req.body);
    res.status(201).json({ message: 'Item save' });
  } catch (error) {
    res.status(500).json({ message: 'Item not save! Please try again.' });
  }
}
