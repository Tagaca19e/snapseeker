import clientPromise from '/lib/mongodb';

export default async function saveData(req, res) {
  const { item_title, user_id } = req.body;

  try {
    // Use mongodb client to connect to the database.
    const client = await clientPromise;
    const db = client.db('snapseeker');

    await db.collection('save_items').deleteOne({
      product_title: `${item_title}`,
      user: `${user_id}`
    })

    res.status(201).json({ message: 'Item deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Item not deleted! Please try again.' });
  }
}