import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 10000, // Increased timeout
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority',
    };

    // If using SRV connection string, ensure it starts with mongodb+srv://
    let mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.error('MONGO_URI is not defined in environment variables');
      process.exit(1);
    }

    // Try to connect
    const conn = await mongoose.connect(mongoURI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });

  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    console.error('\nPossible solutions:');
    console.error('1. Check your internet connection');
    console.error('2. Verify your MongoDB Atlas cluster is running (not paused)');
    console.error('3. Whitelist your current IP address in MongoDB Atlas:');
    console.error('   - Go to https://cloud.mongodb.com → Network Access → Add IP Address');
    console.error('4. Check that your MONGO_URI is correct in the .env file');
    console.error('5. If using a local MongoDB, use: mongodb://localhost:27017/jobboard');
    
    // Exit process with failure in production
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
