const collection = require('../public/scripts/serverScript');

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const check = await collection.findOne({ name: req.body.name });
      if (check.password === req.body.password) {
        res.redirect('/monthView');
      } else {
        res.status(401).send('username exists, incorrect password');
      }
    } catch {
      res.status(401).send('incorrect credentials');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};

