const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const Bike = require("../models/bike");
const Shop = require("../models/shopregister"); // Ensure this is the correct model
const mongoose = require("mongoose");

// Middleware: JWT verification for shop users
const verifyShop = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    if (decoded.role !== "shop") {
      return res.status(403).json({ error: "Forbidden: Not a shop user" });
    }

    req.user = decoded; // Add user info (email, role) to req        
    next();
  });
};

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/**
 * GET /shop/me
 * Used to get ShopId based on JWT (called in frontend useEffect)
 */
router.get("/shop/me", verifyShop, async (req, res) => {
  try {
    const shop = await Shop.findOne({ email: req.user.email });
    if (!shop) return res.status(404).json({ error: "Shop not found" });

    res.json({ id: shop._id, email: shop.email, name: shop.name });
  } catch (err) {
    console.error("Error fetching shop info:", err);
    res.status(500).json({ error: "Failed to fetch shop info" });
  }
});

//bike status
// PUT /bike/status/:id - update availability status
router.put('/status/:id', async (req, res) => {
  const bikeId = req.params.id;
  const { status } = req.body;

  try {
    const bike = await Bike.findByIdAndUpdate(bikeId, { status }, { new: true });

    if (!bike) {
      return res.status(404).json({ error: 'Bike not found' });
    }

    res.status(200).json({ message: 'Bike status updated successfully', bike });
  } catch (error) {
    console.error('Error updating bike status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// POST /CreateBike
// Handles bike creation with image and shop ID
// router.post("/CreateBike", verifyShop, upload.single("file"), async (req, res) => {
//   try {
//     const { BikeNo, BikeName, BikeDescription, BikePrice, ShopId } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: "No image uploaded" });
//     }

//     // Check if the BikeNo already exists
//     const existingBike = await Bike.findOne({ BikeNo });
//     if (existingBike) {
//       return res.status(400).json({ error: "Bike No already exists. Please use a different number." });
//     }

//     // Create and save bike
//     const newBike = new Bike({
//       BikeNo,
//       BikeName,
//       BikeDescription,
//       BikePrice,
//       BikeImage: req.file.filename, // Save image filename
//       ShopId, // Sent from frontend
//     });

//     await newBike.save();
//     res.status(200).json({ message: "Bike created successfully" });
//   } catch (err) {
//     console.error("Error creating bike:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// POST /CreateBike
// Handles bike creation with image and shop ID
router.post("/CreateBike", verifyShop, upload.single("file"), async (req, res) => {
  try {
    const { BikeNo, BikeName, BikeDescription, BikePrice, ShopId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Create and save bike
    const newBike = new Bike({
      BikeNo,
      BikeName,
      BikeDescription,
      BikePrice,
      BikeImage: req.file.filename, // Save image filename
      ShopId, // Sent from frontend
    });

    await newBike.save();
    res.status(200).json({ message: "Bike created successfully" });
  } catch (err) {
    console.error("Error creating bike:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});




// GET /bikes/:shopId
// Fetch all bikes for a specific shop
router.get("/bikes/:shopId", async (req, res) => {
  try {
    const shopId = req.params.shopId;
    console.log("Fetching bikes for shop ID:", shopId);

    const objectId = new mongoose.Types.ObjectId(shopId);
    const bikes = await Bike.find({ ShopId: objectId });

    console.log("Found bikes:", bikes);
    res.json(bikes);
  } catch (err) {
    console.error("Error fetching bikes:", err);
    res.status(500).json({ error: "Failed to fetch bikes" });
  }
});
    
// Get a single bike by its ID
router.get("/bike/:id", async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) {
      return res.status(404).json({ error: "Bike not found" });
    }
    res.json(bike);
  } catch (err) {
    console.error("Error fetching bike:", err);
    res.status(500).json({ error: "Failed to fetch bike" });
  }
});
// PUT /bike/:bikeId
// Updates bike data (including image if provided)
router.put("/bike/:bikeId", upload.single("BikeImage"), async (req, res) => {

  const { bikeId } = req.params;
  const { BikeNo, BikeName, BikeDescription, BikePrice } = req.body;
  let BikeImage = req.body.BikeImage;

  if (req.file) {
    BikeImage = req.file.filename; // If new image is uploaded, update BikeImage
  }

  try {
    const updatedBike = await Bike.findByIdAndUpdate(
      bikeId,
      { BikeNo, BikeName, BikeDescription, BikePrice, BikeImage },
      { new: true }
    );

    if (!updatedBike) return res.status(404).json({ message: "Bike not found" });

    res.json(updatedBike);
  } catch (err) {
    console.error("Error updating bike:", err);
    res.status(500).json({ message: "Error updating bike" });
  }
});

// DELETE /bike/:bikeId
// Deletes a bike based on its ID
router.delete('/bike/:bikeId', verifyShop, async (req, res) => {
  try {
    const bikeId = req.params.bikeId;
    await Bike.findByIdAndDelete(bikeId);
    res.status(200).json({ message: 'Bike deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete bike' });
  }
});

module.exports = router;
