const express = require('express');
const Sequelize = require('sequelize');
require('dotenv').config();
const cors = require('cors');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
});

sequelize.authenticate()
  .then(() => console.log('Connection to MySQL has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const app = express();
const PORT = process.env.PORT || 3000;

const supplierRoutes = require('./routes/suppliers');

app.use(cors());
app.use(express.json());
app.use('/api/suppliers', supplierRoutes);

app.get('/', (req, res) => {
  res.send('Dobrodošli u PIM sistem!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});