  const express = require('express');
  const app = express();
  const browserObject = require('./browser');
const scraperController = require('./pageController');
const bodyparser = require('body-parser');
const { LM } = require('./models/linkModel');
const { default: mongoose } = require('mongoose');


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
      app.listen(3000, ()=>{
          console.log('Server is running on port 3000');
      })
        const scrape = () => { 
      let browserInstance = browserObject.startBrowser();
      scraperController(browserInstance)
        }
      setInterval(scrape, 15000)

  module.exports = app;
