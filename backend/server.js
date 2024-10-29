require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const cors =require('cors');
const path = require('path');
const route = require('./routes/routes');
const port = process.env.PORT || 3000;


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

app.use('/Ofurits',route);

// server port
app.listen(port, () => {
   console.log(`Server running on ${port}`);
});
