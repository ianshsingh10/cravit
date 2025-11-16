import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- IMPORTANT ---
// 1. Adjust this path to correctly point to your Item model
// (Assuming your script is in /scripts and your model is in /models)
import Item from '../models/items.js'; 

// 2. Add your MongoDB Connection String here
const MONGO_URI = "mongodb+srv://cravit-admin:maddy123@cravit.hmu7cra.mongodb.net/?retryWrites=true&w=majority&appName=craVIT";

// --- Helper to get directory path ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Path to your JSON data file ---
// (Assuming your script is in /scripts and your json is in /json)
const JSON_PATH = path.join(__dirname, '../json/underbelly.json');

// --- The Seller ID for "Under Belly" ---
const SELLER_ID = "6893a0ca7d8cd11a9299c39f";

const seedDatabase = async () => {
  try {
    if (!MONGO_URI || MONGO_URI.includes("<user>")) {
      console.error("\nERROR: Please update the MONGO_URI in scripts/seedUnderbelly.mjs\n");
      return;
    }

    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URI);
    console.log('Database connected.');

    // 1. Read the JSON file
    console.log(`Reading data from ${JSON_PATH}`);
    const rawData = fs.readFileSync(JSON_PATH, 'utf-8');
    const items = JSON.parse(rawData);

    // 2. Transform the data (convert $oid, etc.)
    const transformedItems = items.map(item => ({
      sellerId: item.sellerId.$oid,
      sellerName: item.sellerName,
      itemName: item.itemName,
      price: item.price,
      availability: item.availability !== undefined ? item.availability : true,
      image: item.image,
      category: item.category,
      reviews: item.reviews || [],
      rating: item.rating || 0,
      numReviews: item.numReviews || 0,
      // Mongoose will add createdAt and updatedAt automatically
    }));

    // 3. Delete old items for this seller to avoid duplicates
    console.log(`Clearing old items for seller: ${SELLER_ID}...`);
    const deleteResult = await Item.deleteMany({ sellerId: SELLER_ID });
    console.log(`Deleted ${deleteResult.deletedCount} old items.`);

    // 4. Insert the new, transformed data
    console.log(`Inserting ${transformedItems.length} new items...`);
    await Item.insertMany(transformedItems);
    console.log('\n✅ Success! Database has been seeded with "Under Belly" items.');

  } catch (error) {
    console.error('\n❌ Error seeding database:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
};

seedDatabase();