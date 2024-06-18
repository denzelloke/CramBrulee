const path = require('path');
const hbs = require('hbs');

const templatePath = path.join(__dirname, '../public/templates');

// Configure hbs
hbs.registerPartials(templatePath);

const renderTemplate = (templateName, data) => {
  return new Promise((resolve, reject) => {
    hbs.renderFile(path.join(templatePath, `${templateName}.hbs`), data, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

export default async (req, res) => {
  try {
    const viewName = req.url.slice(1) || 'login';
    const html = await renderTemplate(viewName, {});
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Error rendering template');
  }
};