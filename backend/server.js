const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mango= require(`./config/mongo`)
PORT= process.env.PORT;

mango();

const app = express();
app.use(express.json())
app.use(cors())

app.use(`/logtype`,require(`./routes/auth`))
app.use(`/tasktype`,require(`./routes/books`))



app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
  });
