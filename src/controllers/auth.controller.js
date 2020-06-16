const authCtrl = {};
let datosUsuario = {
    "nombre": "",
    "apellido": "",

    "usuario": "",
    "correo": "",

    "contraseña": "",
    "recontraseña": "",

    "añonacimiento": "",
    "comunidad": "",
    "provincia": "",

    "deporte": "",
    "descripcion": ""

};

let nombre;
let apellido;

let usuario;
let correo;

let contraseña;
let recontraseña;

let añonacimiento;
let comunidad;
let provincia;

let deporte;
let descripcion;

const passport = require('passport');

authCtrl.renderSignUp = (req, res) => {
    res.render('auth/signup');
};

authCtrl.signUp = passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    failureFlash: true
});



authCtrl.renderSignIn = (req, res, next) => {

    res.render('auth/signin');

};

authCtrl.signIn = passport.authenticate('local.signin', {
    successRedirect: '/app',
    failureRedirect: '/signin',
    failureFlash: true
});

authCtrl.logout = (req, res, next) => {
    //   res.cookie.clear();
    req.logOut();
    req.user = null;
    res.redirect('/');
};



module.exports = authCtrl;