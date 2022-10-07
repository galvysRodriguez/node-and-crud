const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
// SIGNUP
router.get('/login', isNotLoggedIn, (req, res) => res.render('login/login'));

router.post('/register', passport.authenticate('local.register', {
  successRedirect: '/profile',
  failureRedirect: '/register',
  failureFlash: true
}));

// SINGIN
router.get('/register', isNotLoggedIn, (req, res) => res.render('login/register'));

router.post('/login', 
  passport.authenticate('local.login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }))

router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

router.get('/profile', isLoggedIn, (req, res) => res.render('profile'));

module.exports = router;

/*const express = require('express');
const router = express.Router();
const passport = require('passport')
const { isLoggedIn } = require('../lib/auth');
const pool = require('../database');
router.get('/login', (req, res)=>{
    res.render('login/login')
})

router.post('/login',
    passport.authenticate('local.login',{
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}))

router.post('/register', (req,res) =>{
    passport.authenticate('local.register',{
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true
})(req, res)
})
/*router.post('/login', async (req, res)=>{
    const {email, password} = req.body
    const  emailsession = email
    console.log(emailsession);
    const  passwordsession = password
    const consultemail = await pool.query("SELECT * FROM `users` WHERE `email` LIKE ?", [emailsession]);
    const consultpassword = await pool.query("SELECT * FROM `users` WHERE `password` LIKE ?",[passwordsession]);
    console.log(consultemail);
   console.log(consultemail[0]);
   console.log(consultpassword[0]);
    if(consultemail[0] !== undefined){
        if(consultpassword[0] !== undefined){
            res.redirect('/login/profile')
        }
        else{
            res.send('contraseña invalida')
        }
    }
    else {
        res.send('correo no registrado')
    }
    
});*/
/*router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
  });

router.get('/',async (req, res)=>{
    const users = await pool.query('SELECT * FROM users ');
    console.log(users);
    res.render('login/list', {users})

})

router.get('/profile', isLoggedIn, (req, res ) =>{
    res.render('login/profile')
})

router.get('/register', async (req, res ) =>{
    res.render('login/register')})*/
    

/*router.post('/register', async(req, res) =>{
    const{email, password,name, phone, identify, lastname} =req.body;
    console.log(req.body);
    const newusers = {
        name,
        lastname,
        email,
        password,
        phone,
        identify
    }
    await pool.query('INSERT INTO users set ?', [newusers])
    res.redirect('/profile')
})*/

