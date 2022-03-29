var cors = require('cors')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;


 
app.use(cors())
var corsOptions = {
    origin: 'localhost:3000/' || "https://dazzling-biscotti-85f297.netlify.app",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const { MONGODB_URI } = require('./config');

mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log("connected");
});
mongoose.connection.on('error', (error) => {
    console.log("Some error ", error);
});


require('./models/user_model');
require('./models/post_model');

app.use(express.json());
app.use(require('./routes/authentication'));
app.use(require('./routes/postRoute'));
app.use(require('./routes/userRoute'));

app.listen(PORT, () => {
    console.log("server started");
});