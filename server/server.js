const express = require("express");
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;
//const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const cors= require('cors')
const morgan= require('morgan')
const registerUserRoutes = require('./src/routes/api/registerUser')
const loginUserRoutes = require('./src/routes/api/loginUser')
const uploadImageRoutes = require('./src/routes/api/uploadImage')
const fetchImageRoutes = require('./src/routes/api/fetchImage')
const searchGraphKeywordRoutes= require('./src/routes/api/searchGraphKeyword')
const http= require('http')
const app = express();
//const server = http.createServer(app);
const server = http.createServer(app);
server.maxHeadersCount = 1000; // or a higher number
server.maxHttpHeaderSize = 64 * 1024; // or a higher number in bytes
dotenv.config();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./public")));
app.use(cors())
app.use(morgan('tiny'))
app.use('/api/registerUser',registerUserRoutes)
app.use('/api/loginUser',loginUserRoutes)
app.use('/api/uploadImage',uploadImageRoutes)
app.use('/api/fetchImage',fetchImageRoutes)
app.use('/api/searchGraphKeyword',searchGraphKeywordRoutes)
//const {mongoConfig}= require('./dbconfig')
//app.get('/', (req,res)=> console.log('Hello World'))

const heapdump = require('heapdump');
app.get('/heapdump', (req, res) => {
  heapdump.writeSnapshot((err, filename) => {
    if (err) {
      console.error(err);
      res.status(500).send('Heapdump failed');
    } else {
      console.log(`Heapdump written to ${filename}`);
      res.status(200).send('Heapdump written');
    }
  });
});
app.get('/', () =>{
  console.log("Server started: get root url");
})
app.listen(PORT,async () => {
  console.log(`App listening at http://localhost:${PORT}`);
})