// declaracion
const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash')
const session = require('express-session')
const mysqlstore = require('express-mysql-session')(session)
const {database } = require('./keys');
const passport = require('passport')
const bodyParser = require('body-parser');
//inicializaciones
const app = express();
require('./lib/passport')

//configuraciones del servidor, puerto en que va a funcionar
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname, 'views'))
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))

app.set('view engine', '.hbs')
//Middlewares: funciones que se ejecutan cada vez que el usuario pide una peticion
app.use(session({
    secret: 'userconected',
    resave: false,
    saveUninitialized: false,
    store:new mysqlstore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize())
app.use(passport.session())

//variables globales
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next()
})

// rutas del del servidor
app.use(require('./routes/index.js'));
app.use('/publication', require('./routes/publication.js'));
app.use(require('./routes/login.js'));



//archivos publicos
app.use(express.static(path.join(__dirname, 'public')))
//comenzar el servidor
app.listen(app.get('port'),() => {
    console.log('server on port', app.get('port'));
})