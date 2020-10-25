const express = require('express');  // indicate that we're using express (doesn't need filepath), Express is not core module but it's been installed in node modules 
const morgan = require('morgan');    // bring in this middleware
const bodyParser = require('body-parser');    // bring in this middleware
const campsiteRouter = require('./routes/campsiteRouter');   // require campsiteRouter
const promotionRouter = require('./routes/promotionRouter');     // Integrate the Node module you created above within your Express application code in server.js
const partnerRouter = require('./routes/partnerRouter');         // Integrate the Node module you created above within your Express application code in server.js

const hostname = 'localhost';    // step 2 
const port = 3000;              // step 3 

const app = express();      // call the express function which returns express server app which is available under var name app
app.use(morgan('dev'));     // insert morgan middleware by using morgan function, using argument 'dev'. This will configure morgan to log using dev version, which will print additional info to screen
app.use(bodyParser.json());  // parse JSON formatted data. When server receives requests with JSON formatted data in body, body parser mw will parse that data into properties of the request object so we can access that data more easily

app.use('/campsites', campsiteRouter);  // provide route path for campsiteRouter here 

app.all('/campsites', (req, res, next) => {   // routing method catch-all for HTTP verbs. Set properties on response object that we'll use as default for routing methods on this path. Takes path as first param= /campsites. Any HTTP req will trigger this method. 2nd param= callback func w params (req, res, next)
    res.statusCode = 200;  // set response code 
    res.setHeader('Content-Type', 'text/plain');  // send back plain text in response body 
    next();  // pass control of app routing to next relevant routing method after this one. Otherwise, it would just stop here and not go further
});

app.get('/campsites', (req, res) => {  // set up endpoint for get requests /campsites, will take a callback func (req, res), don't need to process any more routing methods after this one so I don't need next in there too
    res.end('Will send all the campsites to you');  // response status code and headers are already set by app.all method, so we just need res.end to send msg body back to client
});

app.post('/campsites', (req, res) => {  // set up endpoint for post request /campsites, after Express server handles code inside callback for app.all, it'll move to next relevant routing method. If post request comes in App.all --> app.post, skipping app.get method
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);  // post request typically 
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403;  // reject the request to this endpoint, operation is not supported 
    res.end('PUT operation not supported on /campsites');  // this is the response at this endpoint
});

app.delete('/campsites', (req, res) => { 
    res.end('Deleting all campsites');   // return a response. This is a dangerous operation; don't allow ordinary users to do this, restrict to privileged users
});

app.get('/campsites/:campsiteId', (req, res) => {   // add a route param /:campsiteId. This will allow us to store whatever client sends as part of path after / as a route param named campsiteId. Use this same path for 4 methods below
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);  // respond with this for now 
});

app.post('/campsites/:campsiteId', (req, res) => {  
    res.statusCode = 403;   // not supporting post request on this path, operation not supported 
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);   // message for client 
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);  // res.write method: updating campsite. /n causes a new line in the body. Then res.end message; use request.body.name
    res.end(`Will update the campsite: ${req.body.name}  
        with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);  // we're deleting specific campsite in this endpoint
});

app.use(express.static(__dirname + '/public'));   // middleware function express.static. Argument __dirname + '/public'. __dirname refers to absolute path of current directory of the file it's in. This line is all we need to have express serve static files from the public folder

app.use((req, res) => {         // app.use takes callback/middleware function. Takes req, res, next as arguments. Just req and res here
    res.statusCode = 200;       // 
    res.setHeader('Content-Type', 'text/html');   // content type 
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {   // create the server (an instance of HTTP server class) and start listening to it 
    console.log(`Server running at http://${hostname}:${port}/`);  // tells us server is running here
});