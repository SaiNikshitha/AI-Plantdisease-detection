const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const router = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.gclientid,
      clientSecret: process.env.gclientsecret,
      callbackURL: process.env.gcallbackurl,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            role:'user',
          });
        }else if (!user.googleId) {
          // Link Google account to existing user
          user.googleId = profile.id;
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Redirect user to Google authentication page
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }),()=>console.log("in google block"));

// Google OAuth callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  (req, res) => {
    // Generate a JWT for the authenticated user
    console.log("in google callback block");
    console.log(req.user);
    const token = jwt.sign({ _id: req.user._id,email:req.user.email,role:req.user.role}, 'gayathri@123', { expiresIn: '1h' });
    res.cookie("uid",token);
    console.log("cookie set");

    // Redirect to the frontend dashboard with the token
    res.redirect('/');
  }
);

module.exports = router;
