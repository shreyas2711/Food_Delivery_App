const { Client } = require('pg');
// const pgp = require('pg-promise')();
const express = require('express');
const bodyParser = require('body-parser'); 
const authRoutes = require('./routes/authRoutes');
const app = express();
const cookieParser = require('cookie-parser');
const restrauntRoutes = require('./routes/restrauntRoutes');
const driverRoutes = require('./routes/driverRoutes');
const menuRoutes = require('./routes/menuRoutes');
const port = 4000;
require("dotenv").config();
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use(cookieParser());
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

const cors = require('cors');

app.use(cors({
    origin: `${process.env.CROSS_URL}`,
    credentials: true 
  }));

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, 
  });


db.connect() .then(() => { console.log('Connected to PostgreSQL database!'); }) 
.catch((err) => { console.error('Error connecting to the database:', err); });

// const db = pgp({
//     user:'postgres',
//     password:'admin',
//     host:'localhost',
//     port:'5432',
//     database:'mydatabase'
// });


app.use('/api',authRoutes(db));
app.use('/api',restrauntRoutes(db));
app.use('/api',driverRoutes(db));
app.use('/api',menuRoutes(db));
app.use('/api',orderRoutes(db));
app.use('/api',paymentRoutes(db));

app.get('/',(req,res)=>{
    res.send("Hello")
})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });



