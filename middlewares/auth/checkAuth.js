const jwt = require("jsonwebtoken");
const User_model = require("../../model/user")
const ErrorHandller = require("../../utils/handleError/errorHandller");
const catchAsyncErrors = require("../errors/catchAsyncErrors");

// chech user is authenticate or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
     const { token } = req.cookies;
     if (!token) {
          return next(new ErrorHandller('Login to access this resource', 401));
     }
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
     // console.log(decodedToken);
     req.user = await User_model.findById(decodedToken.id)
     // console.log(req.user);
     next();
})

// Handeling user role
exports.authorizeRole = (...roles) => {
     // console.log(roles);
     return (req, res, next)=>{
          if (!roles.includes(req.user.role)) {
               return next(new ErrorHandller(`(${req.user.role}) is not allowed to access this route`,403))
          }
          next();
     }
}