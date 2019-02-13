const express = require('express');
const engine = require('ejs-mate'); 
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

//Init express
const app = express();
//Initialice database
require('./database/connection');

require('./passport/local-auth');

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); 
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'myclaveQuisdeEsquideEquisde',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use((req, res, next) => {
   app.locals.signupMessage = req.flash('signupMessage');
   app.locals.signupMessage = req.flash('signinMessage');
    console.log(app.locals);
    
   next();
})

app.use(passport.initialize());
app.use(passport.session());
app.use('/',require('./routes/index'));

app.listen(app.get('port'), () => {
    console.log('====================================');
    console.log(`Server on port:${app.get('port')}`);
    console.log('====================================');
}) 