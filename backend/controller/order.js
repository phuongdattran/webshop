const express = require('express');
const Order = require('../model/order');

exports.getAllOrder = (req, res, next) => {
    Order.find({userId:req.params.userId})
    .then(orders => res.status(200).json(orders))
    .catch(error => res.status(400).json({error}));
    };

exports.getOneOrder = (req, res, next) => {
    Order.findOne({_id:req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}));
};

exports.createOrder = async (req, res, next) => {
    const order = new Order({...req.body});
    
    order.save()
      .then(() => res.status(201).json({ message: 'Order confirmed'}))
      .catch(error => res.status(400).json({ error }));
};

exports.updateOrder = (req, res, next) => {
    Order.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => {
        res.status(200).redirect('/myaccount/userinfo/');
    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteOrder = (req, res, next) => {
    Order.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({message: 'Your order has been deleted'}))
    .catch(error => res.status(400).json({error}));
};