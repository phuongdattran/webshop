const express = require('express');

exports.signInPage = (req, res, next) => {
    res.render('signin.ejs')
    };

exports.signUpPage = (req, res, next) => {
    res.render('signup.ejs')
    };

exports.signOut = (req, res, next) => {
    res.clearCookie('token').redirect('/home/');
};