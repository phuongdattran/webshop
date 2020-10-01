const express = require('express');

exports.homePage = (req, res, next) => {
    res.render('home.ejs')
    };
