import clientPromise from '/lib/mongodb';

export default async function saveData(req, res) {
  const { product_id, user } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db('snapseeker');

    await db.collection('save_items').deleteOne({
      user: user,
      product_id: product_id,
    });

    const updatedUserSavedProducts = await db
      .collection('save_items')
      .find({ user: user })
      .toArray();

    res.status(201).json({ message: 'Item deleted', updatedUserSavedProducts });
  } catch (error) {
    res.status(500).json({ message: 'Item not deleted! Please try again.' });
  }
}
