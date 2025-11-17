import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Item from "../models/items.js";

function convertOids(input) {
  if (Array.isArray(input)) {
    return input.map(convertOids);
  }

  if (input && typeof input === "object") {
    if (input.$oid) {
      return input.$oid;
    }

    const fixed = {};
    for (const key in input) {
      fixed[key] = convertOids(input[key]);
    }
    return fixed;
  }

  return input;
}

async function seedDatabase() {
  try {
    console.log("MONGO_URI:", process.env.MONGODB_URI); // debugging

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Paths to all JSON files
    const files = [
      "src/json/bistro.json",
      "src/json/underbelly.json",
      "src/json/abdakshin.json"
    ];

    let allItems = [];

    // Read and combine all JSON files
    for (const file of files) {
      const rawData = fs.readFileSync(path.resolve(file), "utf-8");
      const parsed = JSON.parse(rawData);
      const cleaned = convertOids(parsed);
      allItems = allItems.concat(cleaned);
    }

    console.log(`Loaded ${allItems.length} items from all JSON files`);

    // Remove old data (ONLY if you want to overwrite everything)
    await Item.deleteMany({});
    console.log("Cleared previous items");

    // Insert all combined items
    await Item.insertMany(allItems);
    console.log("Database seeded successfully with all items");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seedDatabase();