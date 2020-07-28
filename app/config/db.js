const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    // console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
