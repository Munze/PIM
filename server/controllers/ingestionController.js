// const xml2js = require('xml2js');
const csv = require('csv-parser');
const axios = require('axios');

// Function to process JSON data
exports.processJsonData = async (req, res) => {
  try {
    const response = await axios.get('http://apicatalog.ewe.rs:5001/api/?user=XLS&secretcode=07088&currency=RSD&images=1');
    const jsonData = response.data;

    console.log('Fetched JSON Data:', jsonData); // Log the data to inspect its structure

    // Check if jsonData is an array or has a specific key that contains the array
    const dataArray = Array.isArray(jsonData) ? jsonData : jsonData.items || []; // Adjust based on actual structure

    const mappedData = dataArray.map(item => ({
      // Assuming your schema includes fields like productCode, name, price, etc.
      productCode: item.productCode,
      name: item.name,
      price: item.price,
      // Add more fields as necessary
    }));

    // Example: Save mapped data to the database using Sequelize
    // await YourModel.bulkCreate(mappedData);

    res.send('JSON data ingested successfully');
  } catch (error) {
    console.error('Error fetching or processing JSON data:', error);
    res.status(500).send('Failed to ingest JSON data');
  }
};

// Function to process XML data
exports.processXmlData = (req, res) => {
  const xmlData = req.body;
  xml2js.parseString(xmlData, (err, result) => {
    if (err) {
      return res.status(400).send('Invalid XML data');
    }
    // Logic to process XML data
    res.send('XML data processed successfully');
  });
};

// Function to process CSV data
exports.processCsvData = (req, res) => {
  const csvData = req.body;
  // Logic to process CSV data
  res.send('CSV data processed successfully');
};
