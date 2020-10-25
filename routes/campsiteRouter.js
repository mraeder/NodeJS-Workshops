const express = require('express');    // require express
const bodyParser = require('body-parser');  // require body-parser 
const campsiteRouter = express.Router();  // create a new express router by assigning it to a variable and using express.Router method
campsiteRouter.use(bodyParser.json());  // attach bodyParser middleware. use method for attaching middleware

campsiteRouter.route('/')  // create route method. Single argument is a path, which is /
.all((req, res, next) => {  // chain the all method to this route. Then callback function
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {
    res.end('Deleting all campsites');
});

campsiteRouter.route('/:campsiteId')               // Add a new campsiteRouter.route() method, and as its argument, give it the path of '/:campsiteId'
.all((req, res, next) => {                         // Chain an .all() method to the route() method you added above
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get( (req, res) => {                              // Chain .get(), .post(), .put(), and .delete() methods (endpoints?) to this route as well
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})
.put((req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

module.exports = campsiteRouter;  // export it so it can be used elsewhere 