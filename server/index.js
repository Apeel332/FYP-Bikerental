const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const path = require("path");   
require('dotenv').config();

const registerModel = require('./models/register')
const shopregisterModel = require('./models/shopregister')




const shopRoutes = require('./routes/bikeshops.js'); 
const shopRegisterRoute = require("./routes/shopregister");
const bikeRoutes = require('./routes/bikeRoutes.js')

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


app.post("/login", (req, res) => {
    console.log("Login route accessed");
   const{email, password} = req.body;
    registerModel.findOne({email: email})
    .then(user => {
       
        if(user) {
            bcrypt.compare(password, user.password, (err, response) =>{
                console.log("Password comparison result:", response);
                if(response){
                    console.log("Creating token for user ID:", user._id);
                    const token = jwt.sign(
                      { id: user._id, name: user.name, email: user.email, role: user.role },
                      "jwt-secret-key",
                      { expiresIn: '1d' }
                    );
                    res.cookie('token', token);
                    return res.json({Status: "Success", role: user.role});
                  }
                  else {
                    res.json("The password is incorrect")
                }
            })
        } else {
            res.json("No record existed")

        }
        
    })
})

app.post('/register', (req,res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        registerModel.create({name, email, password: hash})
        .then(user => res.json("Success"))
        .catch(err => res.json(err))

    }).catch(err => console.log(err.message))
    

})

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