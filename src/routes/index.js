const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/signup', (req, res, next) => {
    res.render('signup')
});

router.post('/signup', passport.authenticate('local_signup', {
    successRedirect: '/profile',
    failureRedirect: '/error',
    failureFlash: true
}));

router.get('/signin', (req, res, next) => { 
    res.render('signin');
 });

router.post('/signin', passport.authenticate('local_signin', {
    successRedirect: '/profile',
    failureRedirect: 'error',
    passReqToCallback: true
}));

router.get('/error', (req, res, next) => {
    res.render('err');
})

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
})

router.get('/admin',  isAuth,(req, res, next) => {
    res.render('admin');
})

router.get('/profile', isAuth, (req, res, next) => {
    res.render('profile');
})

function isAuth(req, res, next)  {
    if(req.isAuthenticated()){
        return next()
    }
    
    res.redirect('/')
    
};

module.exports =  router;