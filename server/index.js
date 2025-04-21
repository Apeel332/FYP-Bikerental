const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const path = require("path");   
require('dotenv').config();
const crypto = require('crypto');


const registerModel = require('./models/register')
const shopregisterModel = require('./models/shopregister')




const shopRoutes = require('./routes/bikeshops.js'); 
const shopRegisterRoute = require("./routes/shopregister");
const bikeRoutes = require('./routes/bikeRoutes.js')
const reviewRoutes = require("./routes/reviewsRoutes.js");
const sendEmail = require('./utils/sendEmail'); 

const bookingRoutes = require('./routes/booking');





const app = express()
app.use(express.json())
app.use(cors( {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true

}))
app.use(cookieParser())

mongoose.connect("mongodb://127.0.0.1:27017/bikerental");

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json("Error with token")
            } else {
                if(decoded.role === "admin"){
                    next()
                
                 } else 
                 {
                    return res.json("not admin")
                 }
            }
        })
    }
}

app.get('/admin', verifyUser, (req, res) => {
    res.json("Success")
})


// app.post("/login", (req, res) => {
//     console.log("Login route accessed");
//    const{email, password} = req.body;
//     registerModel.findOne({email: email})
//     .then(user => {
       
//         if(user) {
//             bcrypt.compare(password, user.password, (err, response) =>{
//                 console.log("Password comparison result:", response);
//                 if(response){
//                     console.log("Creating token for user ID:", user._id);
//                     const token = jwt.sign(
//                       { id: user._id, name: user.name, email: user.email, role: user.role },
//                       "jwt-secret-key",
//                       { expiresIn: '1d' }
//                     );
//                     res.cookie('token', token);
//                     return res.json({Status: "Success", role: user.role});
//                   }
//                   else {
//                     res.json("The password is incorrect")
//                 }
//             })
//         } else {
//             res.json("No record existed")

//         }
        
//     })
// })

// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await registerModel.findOne({ email });

//         if (!user) {
//             return res.json("No record existed");
//         }

//         // Check if account is locked
//         if (user.lockUntil && user.lockUntil > new Date()) {
//             const remaining = Math.round((user.lockUntil - Date.now()) / 1000);
//             return res.json(`Account locked. Try again in ${remaining} seconds.`);
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);

//         if (passwordMatch) {
//             // Reset failed attempts and unlock account
//             user.failedLoginAttempts = 0;
//             user.lockUntil = null;
//             await user.save();

//             const token = jwt.sign(
//                 { id: user._id, name: user.name, email: user.email, role: user.role },
//                 "jwt-secret-key",
//                 { expiresIn: '1d' }
//             );
//             res.cookie('token', token);
//             return res.json({ Status: "Success", role: user.role });
//         } else {
//             user.failedLoginAttempts += 1;

//             // Apply 2-minute lock after 3 failed attempts
//             if (user.failedLoginAttempts === 3) {
//                 user.lockUntil = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
//             }

//             // Apply 1-day lock after 5 total failed attempts
//             if (user.failedLoginAttempts >= 5) {
//                 user.lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
//             }

//             await user.save();
//             return res.json("The password is incorrect");
//         }
//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json("Server error");
//     }
// });


// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await registerModel.findOne({ email });
  
//       if (!user) {
//         return res.json("No record existed");
//       }
  
//       // ✅ Check if email is verified
//       if (!user.isVerified) {
//         return res.json("Please verify your email before logging in.");
//       }
  
//       // ⛔ Check if account is locked
//       if (user.lockUntil && user.lockUntil > new Date()) {
//         const remaining = Math.round((user.lockUntil - Date.now()) / 1000);
//         return res.json(`Account locked. Try again in ${remaining} seconds.`);
//       }
  
//       const passwordMatch = await bcrypt.compare(password, user.password);
  
//       if (passwordMatch) {
//         // ✅ Reset failed attempts and unlock account
//         user.failedLoginAttempts = 0;
//         user.lockUntil = null;
//         await user.save();
  
//         const token = jwt.sign(
//           { id: user._id, name: user.name, email: user.email, role: user.role },
//           "jwt-secret-key",
//           { expiresIn: '1d' }
//         );
  
//         res.cookie('token', token, {
//           httpOnly: true,
//           secure: true,
//           sameSite: "Lax"
//         });
  
//         return res.json({ Status: "Success", role: user.role });
//       } else {
//         // ❌ Handle incorrect password attempts
//         user.failedLoginAttempts += 1;
  
//         if (user.failedLoginAttempts === 3) {
//           user.lockUntil = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
//         }
  
//         if (user.failedLoginAttempts >= 5) {
//           user.lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
//         }
  
//         await user.save();
//         return res.json("The password is incorrect");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       res.status(500).json("Server error");
//     }
//   });
  


let otpStore = {}; // Temporary in-memory storage for OTPs (use a more persistent storage if needed)

app.post("/login", async (req, res) => {
  const { email, password, otp } = req.body;

  try {
    const user = await registerModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ Status: "Error", message: "No record existed" });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({ Status: "Error", message: "Please verify your email before logging in." });
    }

    // Check if account is locked
    if (user.lockUntil && user.lockUntil > new Date()) {
      const remaining = Math.round((user.lockUntil - Date.now()) / 1000);
      return res.status(400).json({
        Status: "Error",
        message: `Account locked. Try again in ${remaining} seconds.`,
        lockoutTime: remaining, // Send lockout time back to frontend
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      if (!otp) {
        // If OTP is required (user hasn't provided OTP yet)
        const generatedOtp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
        otpStore[email] = { otp: generatedOtp, expires: Date.now() + 5 * 60 * 1000 }; // OTP valid for 5 minutes

        // Send OTP to the user's email
        await sendEmail(email, 'Your OTP for Login', `Your OTP is: ${generatedOtp}`);

        return res.json({
          Status: "Success",
          step: "otp",
          message: "OTP sent to your email. Please enter it to complete login.",
          tempToken: "some-temporary-token" // This should be a real token for OTP verification if needed
        });
      }

      // Check if OTP is provided and valid
      if (otpStore[email] && otpStore[email].otp === otp && Date.now() < otpStore[email].expires) {
        // OTP is correct and not expired
        delete otpStore[email]; // OTP used, delete it

        // Reset failed login attempts and unlock account
        user.failedLoginAttempts = 0;
        user.lockUntil = null;
        await user.save();

        const token = jwt.sign(
          { id: user._id, name: user.name, email: user.email, role: user.role },
          "jwt-secret-key",
          { expiresIn: '1d' }
        );

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: "Lax" });

        return res.json({ Status: "Success", role: user.role, message: "Login successful" });
      } else {
        return res.status(400).json({ Status: "Error", message: "Invalid or expired OTP" });
      }
    } else {
      user.failedLoginAttempts += 1;

      // Lock account after multiple failed attempts
      if (user.failedLoginAttempts >= 3) {
        user.lockUntil = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes lock
      }

      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day lock
      }

      await user.save();
      return res.status(400).json({ Status: "Error", message: "The password is incorrect" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ Status: "Error", message: "Server error" });
  }
});

app.post("/verify-otp", async (req, res) => {
  const { email, otp, tempToken } = req.body;

  try {
    // Verify that the OTP exists in the store
    if (otpStore[email] && otpStore[email].otp === otp && Date.now() < otpStore[email].expires) {
      // OTP is correct and not expired
      delete otpStore[email]; // OTP used, delete it

      // Retrieve the user from the database
      const user = await registerModel.findOne({ email });

      if (!user) {
        return res.status(400).json({ Status: "Error", message: "No record existed" });
      }

      // Reset failed login attempts and unlock account
      user.failedLoginAttempts = 0;
      user.lockUntil = null;
      await user.save();

      // Generate the JWT token
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email, role: user.role },
        "jwt-secret-key",
        { expiresIn: '1d' }
      );

      res.cookie('token', token, { httpOnly: true, secure: true, sameSite: "Lax" });

      return res.json({ Status: "Success", role: user.role, message: "OTP verified and login successful" });
    } else {
      return res.status(400).json({ Status: "Error", message: "Invalid or expired OTP" });
    }
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ Status: "Error", message: "Server error" });
  }
});

  

// app.post('/register', (req,res) => {
//     const {name, email, password} = req.body;
//     bcrypt.hash(password, 10)
//     .then(hash => {
//         registerModel.create({name, email, password: hash})
//         .then(user => res.json("Success"))
//         .catch(err => res.json(err))

//     }).catch(err => console.log(err.message))
    

// })


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await registerModel.findOne({ email });
        if (existingUser) {
            return res.json("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await registerModel.create({
            name, 
            email, 
            password: hashedPassword, 
            isVerified: false // New user is not verified by default
        });

        // Generate the email verification token
        const verificationToken = jwt.sign({ userId: newUser._id }, 'jwt-secret-key', { expiresIn: '1h' });

        // Create the verification link
        const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;

        // Send the email with the verification link
        await sendEmail(email, 'Please verify your email address', `Click the link to verify your email: ${verificationLink}`);

        res.json("Registration successful. Please verify your email.");
    } catch (error) {
        console.error(error);
        res.status(500).json("Error registering user");
    }
});


app.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, 'jwt-secret-key');
        const user = await registerModel.findById(decoded.userId);

        if (!user) {
            return res.status(400).json("Invalid user");
        }

        // Update user to verified
        user.isVerified = true;
        await user.save();

        res.json("Email verified successfully. You can now log in.");
    } catch (error) {
        console.error(error);
        res.status(400).json("Invalid or expired token");
    }
});


//user data
app.get('/user', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    try {
        const decoded = jwt.verify(token, "jwt-secret-key");
        const user = await registerModel.findOne({ email: decoded.email }).select('name email');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Server error' });
    }
});



//bike booking post
app.use('/bookings', bookingRoutes);

  


// Review routes
app.use("/reviews", reviewRoutes);


//Shop Registration
app.use("/shopregister", shopRegisterRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


//CreateBike
app.use('/', bikeRoutes);


//shop login
app.post("/shoplogin", (req, res) => {
    const{email, password} = req.body;
    shopregisterModel.findOne({email: email})
     .then(manager => {
        
         if(manager) {
             bcrypt.compare(password, manager.password, (err, response) =>{
                 if(response){
                    console.log("Creating token for user ID:", manager._id);
                     const token = jwt.sign({id: manager._id,email: manager.email, role: manager.role},
                         "jwt-secret-key", {expiresIn: '1d'})
                         res.cookie('token', token)
                         return res.json({Status: "Success", role: manager.role})
                    
                 } else {
                     res.json("The password is incorrect")
                 }
             })
         } else {
             res.json("No record existed")
            
         }
         
     })
 })



 // Routes
app.use('/api', shopRoutes); 


 

app.listen(3001, () => {
    console.log("server is running")
})