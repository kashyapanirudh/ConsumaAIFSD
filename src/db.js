const mongoose = require('mongoose');

// Replace 'your-database-url' with the actual MongoDB connection URL
const mongoDBUrl = 'mongodb://localhost:27017/your-database-name';

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
