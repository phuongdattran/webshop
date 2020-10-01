const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUser = (req, res, next) => {
    User.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
    };

exports.getOneUser = (req, res, next) => {
    User.findOne({_id:req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}));
};

exports.createUser = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
            const user = new User({
            ...req.body,
            password: hash
        })
    
    user.save()
      .then(() => res.status(201).json({ message: 'Welcome!'}))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.updateUser = (req, res, next) => {
    if (req.body.password) {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            console.log(hash);
            User.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id, password: hash})
            .then(() => {
                res.status(200).redirect('/myaccount/userinfo/');
            })
            .catch(error => res.status(400).json({ error }));
            }
        )
        .catch(error => res.json({error}));
    }

    User.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => {
        res.status(200).redirect('/myaccount/userinfo/');
    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    User.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({message: 'Your account has been deleted'}))
    .catch(error => res.status(400).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then (user => {
        if(!user) {
            return res.status(401).json({error: 'User not found'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then (valid =>{
            if (!valid) {
                return res.status(401).json({error: 'Wrong password'});
            }
            const token = jwt.sign(
                {userId: user._id},
                'RANDOM_TOKEN_SECRET',
                {expiresIn: '24h'}
                );
            res.cookie('token', token);
            res.status(200).redirect('/home/');
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch (error => res.status(500).json({error}));
};