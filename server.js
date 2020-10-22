const express = require('express');  // indicate that we're using express (doesn't need filepath), Express is not core module but it's been installed in node modules 
const morgan = require('morgan');    // bring in this middleware
const bodyParser = require('body-parser');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');     // Integrate the Node module you created above within your Express application code in server.js
const partnerRouter = require('./routes/partnerRouter');         // Integrate the Node module you created above within your Express application code in server.js

const hostname = 'localhost';    // step 2 
const port = 3000;              // step 3 

const app = express();      // call the express function which returns express server app which is available under var name app
app.use(morgan('dev'));     // insert morgan middleware by using morgan function, using argument 'dev'. This will configure morgan to log using dev version, which will print additional info to screen
app.use(bodyParser.json());

app.use('/campsites', campsiteRouter);    // route handler to connect with each file 
app.use('/promotions', promotionRouter);  // route handler
app.use('/partners', partnerRouter);      // route handler

app.use(express.static(__dirname + '/public'));   // middleware function express.static. Argument __dirname + '/public'. __dirname refers to absolute path of current directory of the file it's in. This line is all we need to have express serve static files from the public folder

app.use((req, res) => {         // app.use takes callback/middleware function. Takes req, res, next as arguments. Just req and res here
    res.statusCode = 200;       // 
    res.setHeader('Content-Type', 'text/html');   // content type 
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {   // create the server (an instance of HTTP server class) and start listening to it 
    console.log(`Server running at http://${hostname}:${port}/`);  // tells us server is running here
});