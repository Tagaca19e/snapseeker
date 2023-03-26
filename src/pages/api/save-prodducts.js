import clientPromise from '/lib/mongodb';

export default async function saveData(req, res) {
   const {user_id,item_link,item_thumbnail,
  item_title,item_rating,item_price} = req.body;


    try {
      // Use mongodb client to connect to the database.
      const client = await clientPromise;
      const db = client.db('snapseeker');
  
      // Check if item already exists.
      const item = await db
        .collection('save_items')
        .find({ user: req.body.user_id, product_title: req.body.item_title})
        .toArray();
  
      if (item.length > 0) {
        return res
          .status(409)
          .json({ message: 'item already exists' });
      }
  
      
      await db.collection('save_items').insertOne({
        user: `${user_id}`,
        product_link: `${item_link}`,
        product_thumbnail: `${item_thumbnail}`,
        product_title: `${item_title}`,
        product_rating: `${item_rating}`,
        product_price: `${item_price}`,
      }),

  
      res.status(201).json({ message: 'Item save' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message:'Item not save! Please try again.' });
    }
  }
  