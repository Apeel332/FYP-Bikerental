const express = require('express');
const router = express.Router();
const shopregisterModel = require('../models/shopregister');
const mongoose = require('mongoose');

// Get all shops
router.get('/shops', async (req, res) => {
  try {
    const shops = await shopregisterModel.find({}, { password: 0 });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single shop
router.get('/shops/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const shop = await shopregisterModel.findById(req.params.id, { password: 0 });
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update shop
router.put('/shops/:id', async (req, res) => {
  try {
    const { shopname, address, contact, name, email } = req.body;
    
    // Validation checks...
    
    const updatedShop = await shopregisterModel.findByIdAndUpdate(
      req.params.id,
      { shopname, address, contact, name, email },
      { new: true, select: { password: 0 } }
    );

    if (!updatedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.json({
      message: 'Shop updated successfully',
      shop: updatedShop
    });
  } catch (error) {
    // Error handling...
  }
});




// DELETE shop
router.delete('/shops/:id', async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      const deletedShop = await shopregisterModel.findByIdAndDelete(req.params.id);
      
      if (!deletedShop) {
        return res.status(404).json({ message: 'Shop not found' });
      }
      
      res.json({ 
        message: 'Shop deleted successfully',
        deletedShop 
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error deleting shop',
        error: error.message 
      });
    }
  });
  

module.exports = router;