const express = require("express");

exports.searchPage = async (req, res, next) => {
  try {
    let searchInput = req.body.search;
    let url = `https://webshop-exo.herokuapp.com/api/search/${searchInput}`;
    let result = await fetch(url);
    result = await result.json();
    res.render("search.ejs", { result });
  } catch {
    res.status(401).json({ error: "Cannot fetch result" });
  }
};
