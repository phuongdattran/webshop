const express = require('express');

exports.shopPage = async (req, res, next) => {
    try {
        let url = `http://localhost:3000/api/shop/`;
        let productList = await fetch(url);
        productList = await productList.json();
        //let productList = [{name:"fetch marche pas"}];
        res.render('shop.ejs', {productList});
    } catch {
        res.status(401).json({error: 'Cannot fetch product list'});
    }
};
