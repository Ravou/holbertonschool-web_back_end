const http = require('http');
const countStudents = require('./3-read_file_async');

const port = 1245;
const database = process.argv[2]; // nom du fichier csv passé en argument

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    let responseText = 'This is the list of our students\n';

    try {
      // Redirige la sortie console dans une variable pour la récupérer
      const originalLog = console.log;
      const logs = [];
      console.log = (msg) => logs.push(msg);

      await countStudents(database);

      console.log = originalLog;
      responseText += logs.join('\n');
    } catch (err) {
      responseText += err.message;
    }

    res.end(responseText);
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(port);

module.exports = app;

