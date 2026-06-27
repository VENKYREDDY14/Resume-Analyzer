import connectDB from './database.js';

const initDB = async () => {
  try {
    await connectDB();
    console.log('Database initialized');
  } catch (err) {
    console.error('Error initializing DB:', err);
  }
};

export default initDB;
