const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost/mouka-orders",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      `MongoDB Connected: ${connect.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    // Shut down Application
    process.exit(1);
  }
};

module.exports = connectDB;
