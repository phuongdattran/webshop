const express = require('express');
const jwt = require('jsonwebtoken');
global.fetch = require("node-fetch");

exports.myAccountPage = (req, res, next) => {
    res.render('myaccount.ejs');
};

exports.userInfoPage = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        let url = `http://localhost:3000/api/user/${userId}`;

        myInit = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        let userInfo = await fetch(url, myInit);
        userInfo = await userInfo.json();

        res.render('userinfo.ejs', {userInfo});
    } catch {
        res.status(401).json({error: 'Unauthenticated Request'});
    }
};

exports.editUserInfoPage = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        let url = `http://localhost:3000/api/user/${userId}`;

        myInit = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        let userInfo = await fetch(url, myInit);
        userInfo = await userInfo.json();

        res.render('edituserinfo.ejs', {userInfo});
    } catch {
        res.status(401).json({error: 'Unauthenticated Request'});
    }
};

exports.changePasswordPage = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        let url = `http://localhost:3000/api/user/${userId}`;

        myInit = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        let userInfo = await fetch(url, myInit);
        userInfo = await userInfo.json();

        res.render('changepassword.ejs', {userInfo});
    } catch {
        res.status(401).json({error: 'Unauthenticated Request'});
    }
};

exports.addressPage = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        //const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //const userId = decodedToken.userId;
        let url = `http://localhost:3000/api/user/address/list`;

        myInit = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        let userAddress = await fetch(url, myInit);
        userAddress = await userAddress.json();

        res.render('address.ejs', {userAddress});
    } catch {
        res.status(401).json({error: 'Unauthenticated Request'});
    }
};

exports.addAddressPage = async (req, res, next) => {
    res.render('addaddress.ejs');
};

exports.editAddressPage = async (req, res, next) => {
    try {
        let addressId = req.params.id;
        let url = `http://localhost:3000/api/user/address/${addressId}`;
        const token = req.cookies['token'];
        
        myInit = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        let addressInfo = await fetch(url, myInit);
        addressInfo = await addressInfo.json();

        res.render('editaddress.ejs', {addressInfo});
    } catch {
        res.status(401).json({error: 'Unauthenticated Request'});
    }
};