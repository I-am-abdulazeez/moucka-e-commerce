const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/mouka-orders",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      `MongoDB Connected: ${connect.connection.host}`.cyan.underline.bold,
      connect
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    // Shut down Application
    process.exit(1);
  }
};

module.exports = connectDB;
