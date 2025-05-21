const mongoose = require("mongoose");
const mongourl = "mongodb+srv://nandanjoshi1807:nandan18@cluster0.h6l4wsb.mongodb.net/foodiz?retryWrites=true&w=majority&appName=AtlasApp";
if (!mongourl) {
  throw new Error('❌ MONGO_URI environment variable not set');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}   

const mongoDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      console.log('✅ Connected to MongoDB');
      return mongoose;
    }).catch((error) => {
      console.error('❌ Error connecting to MongoDB:', error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = mongoDb;
