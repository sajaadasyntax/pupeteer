  const express = require('express');
  const app = express();
  const browserObject = require('./browser');
const scraperController = require('./pageController');
const bodyparser = require('body-parser');
const { LM } = require('./models/linkModel');
const { default: mongoose } = require('mongoose');
var radio = require("radio-stream");
var http = require('http');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://sajaadahmedmobile:sajaadahmedmobile123@cluster0.tzfnc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
}).then(
    () => {
        console.log("Connected to DB");
    },
    (error) => {
        console.log("Error connecting to DB");
        console.log(error);
    }
)



  app.use(express.json());
  
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  app.get('/', (req, res) => {
      res.send('Hello World')
  })
  app.get('/api/hawasLink', async(req, res) => {
    try {
    
        const id = "672f424ea114357acb27c2e3"
        const link = await LM.findById(id);
 
          res.status(200).json(link);
      } catch (error) {
          console.log(error.message);
          res.status(500).json({message : error.message})
      }
    })
  
    app.put('/api/hawasLink', async(req, res) => {
        try {
            const id = "672f424ea114357acb27c2e3"

            const newLink =  await LM.findByIdAndUpdate(id,{
                link: req.body.link
            },
            {
                new: true
            });
            res.status(200).json(newLink);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message : error.message})
        }
    })
      app.listen(4000, ()=>{
          console.log('Server is running on port 4000');
      })
        const scrape = () => { 
      let browserInstance = browserObject.startBrowser();
      scraperController(browserInstance)
        }
      setInterval(scrape, 120000)
      let url = "https://uk24freenew.listen2myradio.com/live.mp3?typeportmount=s1_14899_stream_757046722"
      var stream = radio.createReadStream(url);
      
      var clients = [];
      
      stream.on("connect", function() {
        console.error("connected successfuly!");
        console.error(stream.headers);
      });
      
      
      stream.on("error", function(r) {
          console.error(r);
      });


      

// When a chunk of data is received on the stream, push it to all connected clients
stream.on("data", function (chunk) {
  try {
     if (clients.length > 0) {
         for  (client in clients) {
             clients[client].write(chunk);
         }
     }
 } catch (error) {
     console.error("Error while streaming:", error);
     // Send error response to the client
     for (client in clients) {
         clients[client].writeHead(500, { 'Content-Type': 'text/plain' });
         clients[client].end('Streaming error occurred.');
     }
 }


});

// When a 'metadata' event happens, usually a new song is starting.
stream.on("metadata", function(title) {
console.error(title);
});

// Listen on a web port and respond with a chunked response header. 
var server = http.createServer(function(req, res){ 
 res.writeHead(200,{
     "Content-Type": "audio/mpeg",
     'Transfer-Encoding': 'chunked'
 });
 // Add the response to the clients array to receive streaming
 console.log(res);
 clients.push(res);
 console.log('Client connected; streaming'); 
});
server.listen(3000, (err) => {
 if (err) {
     console.log('Something went wrong');
 }    
 console.log(`Server is running on port 3000`);
});


  module.exports = app;
