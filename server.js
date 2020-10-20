const express = require('express');  // indicate that we're using express (doesn't need filepath), Express is not core module but it's been installed in node modules 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');     // Integrate the Node module you created above within your Express application code in server.js
const partnerRouter = require('./routes/partnerRouter');         // Integrate the Node module you created above within your Express application code in server.js

const hostname = 'localhost';    // step 2 
const port = 3000;              // step 3 

const app = express();      // call the express function which returns express server app which is available under var name app
app.use(morgan('dev'));     
app.use(bodyParser.json());

app.use('/campsites', campsiteRouter);    // route handler 
app.use('/promotions', promotionRouter);  // route handler
app.use('/partners', partnerRouter);      // route handler

app.use(express.static(__dirname + '/public'));

app.use((req, res) => {         // app.use takes callback/middleware function. Takes req, res, next as arguments. Just req and res here
    res.statusCode = 200;       // 
    res.setHeader('Content-Type', 'text/html');   // content type 
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {   // create the server (an instance of HTTP server class) and start listening to it 
    console.log(`Server running at http://${hostname}:${port}/`);  // tells us server is running here
});