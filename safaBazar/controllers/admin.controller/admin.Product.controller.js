const Product = require('../../safaBazarDataModel/product');
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken');
const { response } = require('express');


function addProduct(req, res, next) {
    console.log("inside admin")
    const product = new Product({
        name: req.body.name,
        cp: req.body.cp,
        sp: req.body.sp,
        mp: req.body.mp,
        uqp: req.body.uqp,
        bqp: req.body.bqp,
        cat: req.body.cat,
        productId: req.body.productId,
        pan: req.body.pan
    })
    product.save()
        .then((tr) => {
            (res.send(tr))
        })
        .catch((err) => {
            (res.send(err))
        })


}

function getproduct(req, res, next) {
    console.log("inside get product id");
    Product.find(req.params.id)
        .then((pr) => {
            (console.log(pr), res.send(pr))
        })
        .catch((err) => {
            (res.send(err))
        })
}

function getproducts(req, res, next) {
    console.log("inside get products");
    Product.find()
        .then((pr) => {
            (console.log(pr), res.send(pr))
        })
        .catch((err) => {
            (res.send(err))
        })
}

function deleteProduct(req, res, next) {
    console.log("inside delete user")

    Product.findByIdAndDelete(req.params.id)
        .then((product) => { res.send(product + "deleted sucessfully") })
        .catch((err) => { res.send(err) })

}

function deleteProduct(req, res, next) {
    console.log("inside delete user")

    Product.findByIdAndDelete(req.params.id)
        .then((product) => { res.send(product + "deleted sucessfully") })
        .catch((err) => { res.send(err) })
}

function updateProduct(req, res, next) {

    function updateProduct(req, res, next) {


        console.log("inside updation")
        Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then((product) => {
                (res.status(200).send(product + "updated sucessfully"))
            })
            .catch((err) => {
                const error = "error while updating"
                next(error)
                    (res.send(err))
            })



    }
}

module.exports = { addProduct, getproducts, deleteProduct, updateProduct, getproduct }