const http = require("http");

function willItBlend(callback) {
  // should be true for anything divisible by 3 between 0 and 9
  const itBlends = Math.floor(Math.random() * 10) % 3 === 0;

  if (itBlends) {
    callback(null, "Good news! It Blends!");
  } else {
    callback(new Error("Oh No! It didn't Blend!"));
  }
}

//create a server object:
http
  .createServer(function(req, res) {
    /* delete the line below and replace it with a call to willItBlend.
     write the callback function that is passed to willItBlend inline,
     within the parameter list in the function call */   
    willItBlend((err, success)=>{
      if(err){
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>404'+ err.message +' </h1></body></html>');
        return;
      }
      else{
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>200'+success+' </h1></body></html>');
      }
    });
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080

// this is a fork of https://codesandbox.io/s/rl9v3156lp