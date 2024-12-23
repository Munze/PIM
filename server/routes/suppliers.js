const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Create a new supplier
router.post('/', async (req, res) => {
  console.log('Received data:', req.body);
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    console.log('Suppliers fetched:', suppliers);
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a supplier
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log('Update request received for supplier ID:', id);
    console.log('Update data:', updateData);
    const [updated] = await Supplier.update(updateData, {
      where: { id }
    });
    if (updated) {
      const updatedSupplier = await Supplier.findOne({ where: { id } });
      res.status(200).json(updatedSupplier);
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a supplier
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('DELETE request for supplier ID:', id);
    const deleted = await Supplier.destroy({ where: { id } });
    console.log('Deletion status:', deleted);
    if (deleted) {
      console.log('Supplier deleted successfully:', id);
      res.status(204).send();
    } else {
      console.log('Supplier not found for deletion:', id);
      res.status(404).json({ error: 'Supplier not found' });
    }
  } catch (error) {
    console.log('Error deleting supplier:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Proxy to handle CORS for external feed
router.get('/proxy', async (req, res) => {
  const { url } = req.query;
  console.log('Proxy request for URL:', url);
  try {
    const response = await fetch(url);
    const data = await response.text();
    res.send(data);
    console.log('Data fetched successfully from:', url);
  } catch (error) {
    res.status(500).send('Error fetching data');
    console.error('Error fetching data from:', url, error);
  }
});

module.exports = router;
