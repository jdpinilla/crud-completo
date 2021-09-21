const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const override = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');




//Initializations
const app = express();
require('./database');
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(express.urlencoded({ extended: false }));
app.use(override('_method'));
app.use(session({
    secret: 'mySecretApp',
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Global variables 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
    res.locals.user = req.user || null;
})

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//Static files

app.use(express.static(path.join(__dirname, 'public')))

//Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})