const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const sequelize = require('./config/db');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


// Import routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/category');
const product = require('./routes/product');
const inventory = require('./routes/inventory');
const stockMovement = require('./routes/stockmovement');


// Use routes
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', product);
app.use('/inventory', inventory);
app.use('/stockmovements', stockMovement);

sequelize.sync()  // You can add { force: true } during development to reset DB
  .then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
      
      // test connection 
      sequelize.authenticate()
      .then(() => console.log('Database connected'))
      .catch(err => console.error('Unable to connect to the database:', err));
