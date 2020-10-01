const express = require('express');
const Product = require('../model/product');

exports.getAllProduct = (req, res, next) => {
    Product.find()
    .then(product => res.status(200).json(product))
    .catch(error => res.status(400).json({error}));
    };

exports.getOneProduct = (req, res, next) => {
    Product.findOne({_id:req.params.id})
    .then(product => res.status(200).json(product))
    .catch(error => res.status(404).json({error}));
};

exports.createProduct = async (req, res, next) => {
    const product = new Product({...req.body});
    product.save()
      .then(() => res.status(201).json({ message: 'New product in the shop'}))
      .catch(error => res.status(400).json({ error }));
};

exports.updateProduct = (req, res, next) => {
    Product.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => {
        res.status(200).redirect('/shop/');
    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({message: 'The product has been deleted'}))
    .catch(error => res.status(400).json({error}));
};