const express=require('express');

const connectDB =require('./config/db')

const app=express();
const path = require('path');


//connect db


connectDB();

//Inıt middleware

app.use(express.json());

app.use('/api/users',require('./routes/api/users'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  


//define routes




const PORT=process.env.PORT ||5000;

app.listen(PORT,()=>console.log(`hello server ${PORT}`));