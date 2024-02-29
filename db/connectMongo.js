import mongoose from "mongoose";
const { MONGO_URL } = process.env;

const conectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Connecting error:", err);
  process.exit(1);
});

db.once("open", () => {
  console.log("Database connection successful");
});

export default conectMongo;
