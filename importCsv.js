const csv = require('csv-parse');
const fs = require('fs');

// Función para procesar una línea
function processLine(record) {
  console.log(`Date: ${record.Date}`);
  console.log(`Merchant: ${record.Merchant}`);
  console.log(`Amount (€): ${record["Amount (€)"]}`);
  console.log(`Tag1: ${record.Tag1}`);
  console.log(`Tag2: ${record.Tag2}`);
  console.log(`Tag3: ${record.Tag3}`);
  console.log(`City: ${record.City}`);
  console.log('---');
}

// Función para importar y procesar línea por línea
async function importCsvLineByLine(csvFilename) {
  const parser = csv.parse({ columns: true, delimiter: ',' });

  fs.createReadStream(csvFilename)
    .pipe(parser)
    .on('data', (record) => {
      // Procesa cada línea
      processLine(record);
    })
    .on('end', () => {
      console.log('Finished processing all lines.');
    })
    .on('error', (err) => {
      console.error('Error reading file:', err);
    });
}

// Define el nombre del archivo CSV
const csvFilename = 'data.csv'; // Cambia esto al nombre de tu archivo

// Llama a la función
importCsvLineByLine(csvFilename);
