/*Instalacion de paquetes */
//npm i express
//npm ibodyParser
//npm i xml2js
const express = require('express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const app = express();
const port = 3000;

// Configura el middleware bodyParser para analizar el cuerpo de la solicitud
app.use(bodyParser.text({ type: 'application/xml' }));

// Configura una ruta POST para recibir el archivo XML en '/upload'
app.post('/upload', (req, res) => {
  // Obtiene el XML del cuerpo de la solicitud
  const xmlData = req.body;

  // Configura el parser de xml2js
  const xmlParser = new xml2js.Parser({ explicitArray: false });

  // Convierte XML a JSON
  xmlParser.parseString(xmlData, (err, result) => {
    if (err) {
      console.error('Error al analizar XML:', err);
      res.status(500).send('Error al analizar XML');
    } else {
      // Envía el resultado JSON como respuesta
      res.json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
