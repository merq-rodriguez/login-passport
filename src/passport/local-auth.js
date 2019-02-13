const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

//Se ejecuta una vez hemos ejecutado el metodo done
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});


passport.use('local_signup', new LocalStrategy({ 
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
 }, async (req, email, password, done) => {
     console.log(email);

     const user = await User.findOne({ 'email': email});
     console.log('====================================');
     //console.log(user);
     console.log('====================================');
     if (user) {
         return done(null, false, req.flash('signupMessage', 'Ya existe una cuenta con ese email.'));
     } else {
         const newuser = new User();
         newuser.email = email;
         newuser.password = newuser.encryptPassword(password);
         console.log(newuser);
         
         await newuser.save();
         done(null, newuser);
        }
}));
 //req  -> por si le pedimos al cliente mas parametros al momento de registrarse
 //done -> se devuelve una respuesta al cliente

 passport.use('local_signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
 }, async (req, email, password, done) => {
     const user = await User.findOne({ 'email': email });
   
     if(!user){
        return done(null, false, req.flash('signinMessage', 'No se encontro el usuario.'))
     }
     
     if(!user.comparePassword(password)){
         return done(null, false, req.flash('signinMessage', 'Password Incorrecto'))
     }
     return done(null, user);
 }))