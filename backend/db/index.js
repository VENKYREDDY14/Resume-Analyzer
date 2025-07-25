import sequelize from './database.js';
import Resume from '../models/Resume.js';

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
    await sequelize.sync();
    console.log('Tables synced');
  } catch (err) {
    console.error('Error initializing DB:', err);
  }
};

export default initDB;
