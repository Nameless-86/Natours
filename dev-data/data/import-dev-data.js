const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const Review = require('./../../models/reviewModel');
const User = require('./../../models/userModel');

dotenv.config({ path: './config.env' });

const DB = "mongodb+srv://Pet:123456a@natours-cluster.xbxkr.mongodb.net/test?authSource=admin&replicaSet=atlas-hm21x6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

dbConnect().catch(err => console.log(err));

async function dbConnect() {
  await mongoose.connect(DB);
  console.log("Connected");
}

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
//Import data into db
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log("Data succesfuly loaded")
  } catch (err) {
    console.log(err)
  }
  process.exit();
}


////Delete all data from db

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("Data succesfuly deleted");
  } catch (err) {
    console.log(err)
  }
  process.exit();
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}

console.log(process.argv);