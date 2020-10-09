const express = require('express');
const Newsletter = require('../model/newsletter');

exports.getAllSub = (req, res, next) => {
    Newsletter.find()
    .then(sub => res.status(200).json(sub))
    .catch(error => res.status(400).json({error}));
    };

exports.getOneSub = (req, res, next) => {
    Newsletter.findOne({_id:req.params.id})
    .then(sub => res.status(200).json(sub))
    .catch(error => res.status(404).json({error}));
};

exports.createSub = (req, res, next) => {
    const sub = new Newsletter({
      ...req.body
    });
    sub.save()
      .then(() => res.status(201).json({ message: 'You are subscribed'}))
      .catch(error => res.status(400).json({ error }));
};

exports.updateSub = (req, res, next) => {
    Newsletter.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Subscription updated'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSub = (req, res, next) => {
    Newsletter.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({message: 'You are deleted from the newsletter list'}))
    .catch(error => res.status(400).json({error}));
};