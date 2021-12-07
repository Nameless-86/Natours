const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');




const DB = "mongodb+srv://Pet:123456a@natours-cluster.xbxkr.mongodb.net/test?authSource=admin&replicaSet=atlas-hm21x6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

dbConnect().catch(err => console.log(err));

async function dbConnect() {
  await mongoose.connect(DB);
  console.log("Connected");
}



const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});





