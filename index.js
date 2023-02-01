const express = require("express");

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const http = require("http");
const bcrypt = require("bcrypt");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);

dotenv.config();

const mongoose = require("mongoose");
const { time } = require("console");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const registerSchema = {
  id: Date,
  username: String,
  email: String,
  password: String,
  phoneno: Number,
  dob: Date,
};
const Register = mongoose.model("Register", registerSchema);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/register", async (req, res) => {
  try {
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    const userobj = {
      id: Date.now(),
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      phoneno: req.body.phoneno,
      dob: req.body.dob,
    };

    let usrexst= await Register.exists({username: userobj.username});
    let emailexst= await Register.exists({email: userobj.email});
    // both username and email should be unique
      //console.log(tempobj);
    if (
      !usrexst&&!emailexst
    ) {
      const newuser = new Register(userobj);

      newuser.save(function (err) {
        if (err) {
          console.log("save error");
        } else {
          res.send(
            "<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>"
          );
          console.log("Success entry");
        }
      });
    } else if(!usrexst&&emailexst) {
      let message="user exists";
      console.log(message);
      res.send(
        "<div align ='center'><h2>"+message+"</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>" 
      ); 
    }
    else if(!emailexst&&usrexst){
      let message="email exists";
      console.log(message);
      res.send(
        "<div align ='center'><h2>"+message+"</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>" 
      );
    }
    else{
      let message="already registered user";
      console.log(message);
      res.sendFile(path.join(__dirname,"./public/registration.html"),{mes: message});
    }
  } catch(err) {
    //res.send("Internal server error");
    console.log("Catch error",err);
    res.redirect("/error");
  }
});

app.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/error.html"));
});

app.post('/login', async (req, res) => {
    try{
        //query for existing user returns one record
        let foundUser = await Register.findOne({email: req.body.email});
        
        if (foundUser!=null) {

            let submittedPass = req.body.password;
            let storedPass = foundUser.password;

            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;

                //JWT Token generration
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                let data = {
                    time: Date(),
                    userId: usrname,
                }

                const token = jwt.sign(data, jwtSecretKey);
                console.log(token);
                res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div><p>${token}</p>`);
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {

            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);

            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch(err){
        res.send("Internal server error"+err);
    }
});

// server.listen(3000, function () {
//   console.log("server is listening on port: 3000");
// });

let PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}...`);
});
app.get("/login", (req, res)=>{
  res.sendFile(path.join(__dirname, "./public/login.html"));  
})

app.post("/login", (req, res) => {
  // Validate User Here
  // Then generate JWT Token
  console.log(req);
  
  res.send(token);
});


// Verification of JWT
app.get("/user/validateToken", (req, res) => {
  // Tokens are generally passed in header of request
  // Due to security reasons.

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
      const token = req.header(tokenHeaderKey);

      const verified = jwt.verify(token, jwtSecretKey);
      if(verified){
          return res.send("Successfully Verified");
      }else{
          // Access Denied
          return res.status(401).send(error);
      }
  } catch (error) {
      // Access Denied
      return res.status(401).send(error);
  }
});


