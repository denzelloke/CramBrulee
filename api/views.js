const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const templatePath = path.join(__dirname, '../public/templates');

// Configure Handlebars
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: false, layoutsDir: templatePath }));
app.set('view engine', 'hbs');
app.set('views', templatePath);

const renderTemplate = (templateName, data) => {
  return new Promise((resolve, reject) => {
    app.render(templateName, data, (err, html) => {
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
    const viewName = req.url.slice(1).split('?')[0] || 'login'; // Ignore query parameters
    console.log(`Requested template: ${viewName}`); // Log the requested template
    
    // Check if the requested template exists
    if (viewName === '' || viewName === 'favicon.ico') {
      res.status(404).send('Resource not found');
      return;
    }

    const html = await renderTemplate(viewName, {});
    res.status(200).send(html);
  } catch (error) {
    console.error('Error Details:', error);
    res.status(500).send('Error rendering template');
  }
};

// Listen on a port when running locally
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}