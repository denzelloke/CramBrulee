const path = require('path');
const hbs = require('hbs');

const templatePath = path.join(__dirname, '../public/templates');

export default (req, res) => {
  if (req.method === 'GET') {
    const viewName = req.url.slice(1) || 'login';
    res.render(path.join(templatePath, viewName));
  } else {
    res.status(405).send('Method Not Allowed');
  }
};