import mongoose from "mongoose";

const connection = {};

const connectToDb = async () => {
  if (connection.isConnected) {
    console.log("Mongo db is Already Connected to database");
    return;
  }
  try {
    // eslint-disable-next-line no-undef
    const db = await mongoose.connect(process.env.MONGO_URL);

    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected Successfully");
  } catch (error) {
    console.log("DB connection failed");
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

export default connectToDb;
