const ErrorHandller = require('../../utils/handleError/errorHandller');
module.exports = (err, req, res, next) => {
     err.statusCode = err.statusCode || 500;
     // err.message = err.message || 'Internal Server Error !!!';

     if (process.env.NODE_ENV === 'PRODUCTION') {
          
          // wrong mongoose Object id Error
          if (err.name === 'CastError') {
               const message = `Recource not found. Invalid: ${err.path}`;
               err = new ErrorHandller(message,400);
          }

          //Handel mogoose validationError 
          if (err.name === 'ValidationError') {
               const message = Object.values(err.errors).map(value => value.message); // marge all field error
               err = new ErrorHandller(message,400);
          }

          // Handel mongoose duplicate key error
          if (err.code === 11000) {
               const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
               err = new ErrorHandller(message,400);
          } 

          // Handel wornk JWT token
          if (err.name === 'JsonWebTokenError') {
               err = new ErrorHandller('Token is invalid. Try again !!!',400);
          }

          // Handel Expire JWT token
          if (err.name === 'TokenExpiredError') {
               err = new ErrorHandller('Token is expired. Try again !!!',400);
          }

          return res.status(err.statusCode).json({
               success: false,
               // stack: err.stack,
               // error: err,
               message: err.message || 'Internal Server Error !!!'
          });
     }
     return res.status(err.statusCode).json({
          success: false,
          stack: err.stack,
          error: err,
          message: err.message
     });
}