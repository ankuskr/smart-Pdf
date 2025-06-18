const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
dotenv.config({ path: __dirname + '/.env' });



connectDB();




const app = express();


app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')));
app.use('/pdfs', express.static(require('path').join(__dirname, 'pdfs')));

app.use('/api/users', userRoutes);




app.listen(3000, () => console.log('Server running on port 3000'));
