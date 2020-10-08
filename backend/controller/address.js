const express = require("express");
const Address = require("../model/address");
const jwt = require("jsonwebtoken");

exports.getAllAddress = (req, res, next) => {
  Address.find({ userId: req.params.id })
    .then((address) => res.status(200).json(address))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneAddress = (req, res, next) => {
  Address.findOne({ _id: req.params.id })
    .then((address) => res.status(200).json(address))
    .catch((error) => res.status(404).json({ error }));
};

exports.createAddress = (req, res, next) => {
  const token = req.cookies["token"];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userIdCookie = decodedToken.userId;
  const address = new Address({ ...req.body, userId: userIdCookie });
  address
    .save()
    .then(() => res.status(201).redirect(`/myaccount/address/${userIdCookie}`))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateAddress = (req, res, next) => {
  const token = req.cookies["token"];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userIdCookie = decodedToken.userId;
  Address.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => {
      res.status(200).redirect(`/myaccount/address/${userIdCookie}`);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteAddress = (req, res, next) => {
  const token = req.cookies["token"];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userIdCookie = decodedToken.userId;
  Address.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).redirect(`/myaccount/address/${userIdCookie}`))
    .catch((error) => res.status(400).json({ error }));
};
