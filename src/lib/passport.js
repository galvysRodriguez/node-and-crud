const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');
const {validaemail, validateidentify, validatelastname, validatephone, validatename, validatepassword} = require('./validate')

passport.use('local.login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) done(null, user, req.flash('success', 'Welcome ' + user.username));
    else done(null, false, req.flash('message', 'Incorrect Password'));
  } else return done(null, false, req.flash('message', 'The Username does not exists.'))}));

passport.use('local.register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const {name, phone, identify, lastname} = req.body;
  let newUser = {
        email, 
        password,
        name, 
        phone, 
        identify, 
        lastname
  };
  if(validaemail(newUser.email)){
      if(validatepassword(newUser.password)){
        if(validateidentify(newUser.identify)){
          if(validatelastname(newUser.lastname)){
             if(validatename(newUser.name)){
                if(validatephone(newUser.phone)){
                      newUser.password = await helpers.encryptPassword(password);
                    // Saving in the Database
                    const result = await pool.query('INSERT INTO users SET ? ', newUser);
                    newUser.id = result.insertId;
                    done(null, newUser, req.flash('success', 'correctly'))}}}}}}
  else return done(null, false, req.flash('message', 'The Username does not exists.'))
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  if(rows.length > 0 ) done(null, rows[0]);
  else done(null, false)
});



/*const passport = require('passport')
const localstrategy = require('passport-local').Strategy
const pool = require('../database')
const helpers = ('../lib/helpers')


passport.use('local.login', new localstrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done)=>{
    console.log(req.body)
    const  emailsession = email
    console.log(emailsession);
    const  passwordsession =password
    const consultemail = await pool.query("SELECT * FROM `users` WHERE `email` LIKE ?", [emailsession]);
    const consultpassword = await pool.query("SELECT * FROM `users` WHERE `password` LIKE ?", [passwordsession]);
    console.log(consultemail[0] !== undefined);
    if(consultemail[0] !== undefined){
        if(consultpassword[0] !== undefined){
            console.log(6);
            done(req.flash('success','sesion iniciada correctamente'))
        }
        else{
            done(req.flash('message','contraseña invalida'))
        }
    }
    else {
        done(req.flash('message','correo no registrado'))
    }
    
}));



passport.use('local.register', new localstrategy({
    passwordField: 'password',
    passReqToCallback: true},
    async (req, password, done) => {
    console.log(req.body);
    const {name, phone, identify, email}  = req.body
    const newUser = {
        email, 
        password,
        name, 
        phone, 
        identify, 
        lastname,
        email
    }
    const result = await pool.query('INSERT INTO users SET ?', [newUser])
    newUser.id = result.insertid
    req.flash('success', 'user saved sucecesfully')
}
))*/

