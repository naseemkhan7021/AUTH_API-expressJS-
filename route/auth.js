const express = require("express");
const route = express.Router();

const { registerUser, login, logout, sendPasswordResetToken, resetPassword, getUserProfile, updatePassword, updateProfile, getAllUserProfile, getUserByParamsId, updateUser, deleteUser } = require("../controller/auth");
const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth/checkAuth");

// authorization user
route.post('/register', registerUser);
route.post('/login', login);
route.get('/logout', logout);

// reset password
route.get('/password/forgot', sendPasswordResetToken);
route.patch('/password/reset/:token', resetPassword);

// update show,
route.get('/me', isAuthenticatedUser, getUserProfile);
route.patch('/password/update', isAuthenticatedUser, updatePassword);
route.put('/me/update', isAuthenticatedUser, updateProfile);
// only for admin route
route.get('/admin/users', isAuthenticatedUser, authorizeRole('admin'), getAllUserProfile)
route.route('/admin/user/:u_id').put(isAuthenticatedUser, authorizeRole('admin'), updateUser).delete(isAuthenticatedUser, authorizeRole('admin'), deleteUser)

// params methods
route.param('u_id', getUserByParamsId)
module.exports = route;