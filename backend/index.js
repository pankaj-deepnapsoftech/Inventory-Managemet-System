const express = require('express');
const dotenv = require('dotenv');
const { globalErrorHandler } = require('./middlewares/error');
const { connectDB } = require('./utils/connectDB');

// Routes
const authRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const storeRoutes = require("./routes/store");
const agentRoutes = require("./routes/agent");

const app = express();

// TODO
// require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

// DEVELOPMENT ENVIRONMENT
require('dotenv').config({ path: `.env.development` });

// PRODUCTION ENVIRONMENT
// require('dotenv').config({ path: `.env.production` });

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/agent', agentRoutes);

app.use(globalErrorHandler);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on Port: ${process.env.PORT}`);
    connectDB();
});