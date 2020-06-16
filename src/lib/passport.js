const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("./helpers");

const { datosUsuario } = require("../controllers/auth.controller")
var cookieSession = require('cookie-session')
var express = require('express')

var app = express()


passport.use(
    "local.signup",
    new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        async(req, username, password, done) => {

            let nombrecompleto = req.body.nombre + " " + req.body.apellido;
            let correo = req.body.correo;

            let fecha = req.body.year + "-" + req.body.month + "-" + req.body.day;
            añonacimiento = fecha;

            let comunidad = req.body.comunidades.toUpperCase();
            let provincia = req.body.provincias;

            let deportefav = req.body.deporteElegido;
            let descripcion = req.body.descripcion;

            let equipo = "Sin equipo";
            let neventos = "0";
            let namigos = "0";

            let newUser = {
                username,
                password,
                nombrecompleto,
                correo,
                comunidad,
                provincia,
                añonacimiento,
                deportefav,
                equipo,
                neventos,
                namigos,
                descripcion
            };

            newUser.password = await helpers.encryptPassword(password);
            // Saving in the Database
            const result = await pool.query("INSERT INTO usuarios SET ? ", newUser);
            newUser.id = result.insertId;
            return done(null, newUser);
        }
    )
);



passport.use(
    "local.signin",
    new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        async(req, username, password, done) => {

            const rows = await pool.query("SELECT * FROM usuarios WHERE username = ?", [
                username
            ]);
            if (rows.length > 0) {
                const user = rows[0];
                const validPassword = await helpers.matchPassword(
                    password,
                    user.password
                );
                if (validPassword) {
                    done(null, user, req.flash("success", "Bienvenido " + user.username));
                } else {
                    done(null, false, req.flash("message", "Incorrect Password"));
                }
            } else {
                return done(
                    null,
                    false,
                    req.flash("message", "The Username does not exists.")
                );
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    done(null, rows);
});