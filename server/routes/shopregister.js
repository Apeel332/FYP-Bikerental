const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const shopregisterModel = require("../models/shopregister");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads");

fs.mkdirSync(uploadDir, { recursive: true });

// Set up multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST /shopregister
router.post("/", upload.single("image"), (req, res) => {
  const { shopname, address, contact, name, email, password } = req.body;
  const image = req.file ? req.file.filename : null;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      shopregisterModel
        .create({
          shopname,
          address,
          contact,
          name,
          email,
          password: hash,
          image,
        })
        .then((user) => res.json("Success"))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});



// GET /shopregister - Fetch all registered shops
router.get("/", async (req, res) => {
    try {
      const shops = await shopregisterModel.find(); // Get all shops from DB
      res.status(200).json(shops);
    } catch (error) {
      console.error("Error fetching shops:", error);
      res.status(500).json({ message: "Server error while fetching shops." });
    }
  });

  // Fetch specific shop details by ID
router.get("/:id", async (req, res) => {
    try {
      const shop = await shopregisterModel.findById(req.params.id); // Fetch the shop by ID
      if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
      }
      res.json(shop);
    } catch (error) {
      console.error("Error fetching shop details:", error);
      res.status(500).json({ message: "Server error while fetching shop details." });
    }
  });
  
  

module.exports = router;
