const express = require("express");
const jwt = require("jsonwebtoken");
global.fetch = require("node-fetch");

exports.cartPage = (req, res, next) => {
  try {
    res.render("cart.ejs");
  } catch {
    res.status(401).json({ error: "Cannot render page" });
  }
};

exports.checkoutPage = async (req, res, next) => {
  try {
    let userInfo;
    if (req.cookies["token"]) {
      const token = req.cookies["token"];
      const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      const userId = decodedToken.userId;
      let url = `https://webshop-exo.herokuapp.com/api/user/${userId}`;

      myInit = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      userInfo = await fetch(url, myInit);
      userInfo = await userInfo.json();
    } else {
      userInfo = { userId: guest };
    }
    res.render("checkout.ejs", { userInfo });
  } catch {
    res.status(401).json({ error: "Cannot render page" });
  }
};
