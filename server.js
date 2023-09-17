import express from "express";
import connectDB from "./db.js";
import Data from "./model.js"
import axios from "axios";
import model from "./model.js";
import cors from 'cors';
import path from "path";
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname,"./client/build")))

const fetchWazirXData = async () => {
    try {
      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const tickers = response.data;
  
      // Extract the top 10 results
      const top10 = Object.values(tickers).slice(0, 10);
  
      // Save data to MongoDB
      for (const ticker of top10) {
        const {
          name,
          last,
          buy,
          sell,
          volume,
          base_unit,
        } = ticker;
  
        const newTicker = new Data({
          name,
          last,
          buy,
          sell,
          volume,
          base_unit,
        });
  
        await newTicker.save();
      }
  
      console.log('Data saved to MongoDB');
    } catch (error) {
      console.error('Error fetching or saving data:', error);
    }
  };
  
  // Fetch and store data on server start
  fetchWazirXData();

// app.get('/',async (req,res)=>{
//     res.send("Hello World...!")
// })

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"));
})

app.get('/getData',async (req,res)=>{
    try {
        
      const data = await model.find({});
      res.status(200).send({
          success:true,
          message:"All Data fetched successfully",
          data
      })
  
  
  } catch (error) {
      console.log(`Error in getting data ${error}`);
      res.status(500).send({
          success:false,
          message:"Error in getting data",
          error
      })
  }
})



const PORT = process.env.PORT || 5000 ;
app.listen(PORT,()=>{
    console.log(`Server is listening on Port no.${PORT}`);

})