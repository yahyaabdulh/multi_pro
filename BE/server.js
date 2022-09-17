const dotenv = require('dotenv')
dotenv.config()
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require('cors');
const compression = require('compression')
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const port = process.env.PORT || 5000;
const host = process.env.HOST || '127.0.0.1';
const app = express();

app.use(bodyParser.json({
  limit: '1000mb'
}));

app.use(bodyParser.urlencoded({
  limit: '1000mb',
  parameterLimit: 100000,
  extended: true
}));

app.use(function(req, res, next){
    res.setTimeout(2147483647, function(){
    });
    next();
});

app.use(cors());

app.use(compression({
    threshold: 0,
    level: 9
  }))

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

// use JWT auth to secure the api
app.use(jwt());
app.use(errorHandler);

app.use("/api/v1",
  require('./routers')
)
const server = http.createServer(app);

server.listen(port, host, () => console.log(`Listening on port ${host}:${port}`));