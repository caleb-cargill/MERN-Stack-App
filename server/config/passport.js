const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        const { id, emails } = profile;
        const email = emails[0].value;

        let user = await User.findOne({ googleId: id });
        if (!user) {
            user = new User({
                googleId: id,
                email: email,
                loginMethod: 'google'
            });
            await user.save();
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, done));