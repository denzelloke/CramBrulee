const collection = require('../public/scripts/serverScript');

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = {
        name: req.body.name,
        password: req.body.password,
      };

      await collection.insertMany([data]);
      res.writeHead(302, {
        Location: '/login'
      });
      res.end();
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).send('unknown error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};