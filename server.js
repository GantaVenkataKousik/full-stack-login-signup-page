//express package
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const path = require('path');
const ejs = require('ejs');
const { log } = require("console");

const all_products = require('./all_products');

//rest object
//create an instance of an Express application using Node.js
const app = express(); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
//including your CSS files.
// app.use(express.static(path.join(__dirname, 'pubilc')));

//middlewares
// Enables Cross-Origin Resource Sharing for your server.
app.use(cors());
// Parses JSON data in incoming requests.
app.use(express.json());
// Logs HTTP requests in a developer-friendly format.
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,"/public")));


const uri = "mongodb+srv://vk:Bhavani1201@cluster0.kslyn8z.mongodb.net/";

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(uri);
        console.log(`Connected to MongoDB Successfully ${conn.connection.host} `.bgGreen.white);
    }
    catch(err){
        console.log(`Error connecting to MongoDB`.bgWhite.re);
    }
}
connectDB();


//
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
    , role: {
        type: Number,
        default: 0
    }
}, { timeStamps: true });



const users = new mongoose.model("users", usersSchema);

var userid = "";
var role = 0;

app.post('/login', async (req, res) => {
    const { email, password } = req.body
  
    try {
      const user = await users.findOne({ email: email })
      if (user) {
        if (password === user.password) {
          userid = user._id
          console.log(userid)
          role = user.role
          res.redirect('/home') // Render the EJS template named 'ecommerce.ejs'
        } else {
          res.send({ message: "Password didn't match" })
        }
      } else {
        res.redirect('/register')
      }
    } catch (err) {
      console.error(err)
      res.status(500).send({ message: 'Server error' })
    }
  })
  
  app.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    console.log(password);
    try {
      const existingusers = await users.findOne({ email: email }) // Use email1, not email
  
      if (existingusers) {
        res.redirect('/login')
      } else {
        const newusers = new users({
          name,
          email,
          password,
          role: 0
        })
  
        await newusers.save()
        res.redirect('/login')
      }
    } catch (err) {
      console.error(err)
      res.status(500).send({ message: 'Server error' })
    }
  })
  
  app.get('/register', async (req, res) => {
    res.render('register') // Assuming your EJS file is in a "views" folder
  })
  app.get('/login', async (req, res) => {
    res.render('login') // Assuming your EJS file is in a "views" folder
  })
app.get('/home', async (req, res) => {
    res.render('thankyou');
})
  app.listen(9002,() => {
    console.log("BE started at port 9002");
})
