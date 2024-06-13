const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Profile } = require('../models');

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await Profile.findOne({ where: { googleId: profile.id } });
      if (!user) {
        user = await Profile.create({
          googleId: profile.id,
          fullName: profile.displayName,
          username: profile.emails[0].value.split('@')[0], // Example username from email
          email: profile.emails[0].value,
          avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
          active: true,
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Profile.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
