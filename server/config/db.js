import dns from 'dns';
import mongoose from 'mongoose';

// Windows/local DNS often blocks or fails SRV lookups for mongodb+srv (querySrv ECONNREFUSED)
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MongoDB connection error: MONGODB_URI is not set');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error(
      'Tip: Use a full Atlas URI with database name, e.g. ...mongodb.net/a2s_ecommerce?retryWrites=true&w=majority'
    );
    process.exit(1);
  }
};

export default connectDB;
