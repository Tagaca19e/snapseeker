import clientPromise from '/lib/mongodb';

export default async function getSaveItems(req,res) {
    const { user_email } = req.body;

    
    try {
        const client = await clientPromise;
    
        // Choose which database you want to use.
        const db = client.db('snapseeker');
        const user = await db.collection('save_items').find({ user_email: user }).limit(20).toArray();
        // Find the user in the database.
        if (!user) {
          return res
            .status(400)
            .json({ message: 'No Save Items' });
        }
      } catch (error) {
        res.status(200).json({ message: 'Items found' });
      }
}