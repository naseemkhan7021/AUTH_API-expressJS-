const app = require('./app');
const connectToDatabase = require('./config/database');

// handle Uncaught exceptions Error (undefind verialbe or values)
process.on('uncaughtException',err => {
     console.log(`ERROR NAME: ${err.name} -> ERROR: ${err.stack}`);
     console.log('Shutting down the server due to Uncaught exceptions (undefind verialbe)');
     process.exit(1);
});
// setting up config files 
// require('dotenv').config({path:'config/config.env'});
const PORT = process.env.PORT;
 
// Database conection
connectToDatabase();

// listen
const server = app.listen(PORT,()=>{
     console.log(`server started on PORT ${PORT} as ${process.env.NODE_ENV} mode.`);
});

// handle unhandledRejection Error
process.on('unhandledRejection',err => {
     console.log(`ERROR NAME: ${err.name} -> ERROR: ${err.message}`);
     console.log('Shutting down the server due to Unhandled Promisse rejection');
     server.close(()=>process.exit(1));
});   