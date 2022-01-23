const mongoose = require('mongoose');

const connectToDatabase = () => {
     mongoose.connect(process.env.MONGO_URI, {
          // useFindAndModify: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          // useCreateIndex: true,
     },{useFindAndModify: false}).then(con =>{
          console.log(`MongoDB Database connected with host ${con.connection.host}`);
     }).catch(error =>{
          console.log(`error while connecting to Database ${error.message}`);
     })
};

module.exports = connectToDatabase;