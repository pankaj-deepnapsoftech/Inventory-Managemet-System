const express = require("express");
const { create, update, remove, details, loginWithToken, loginWithPassword, resetPasswordRequest, resetPassword, verifyUser, resendOtp, all } = require("../controllers/user");
const { verifyOTP } = require("../middlewares/verifyOTP");
const { isUserVerified } = require("../middlewares/isVerified");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const router = express.Router();

router.post('/', create);
router.get('/all', all);
router.post('/verify', verifyOTP, verifyUser);
router.post('/resend-otp', resendOtp);
router.route('/login')
        .get(isUserVerified, loginWithToken)
        .post(isUserVerified, loginWithPassword);
router.route('/user')
        .get(isAuthenticated, details)
        .put(isAuthenticated, update)
        .delete(isAuthenticated, remove);
router.post('/reset-password-request', isAuthenticated, isUserVerified, resetPasswordRequest);
router.post('/reset-password', isAuthenticated, isUserVerified, verifyOTP, resetPassword);

module.exports = router;