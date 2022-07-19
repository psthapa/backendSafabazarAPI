const Client = require('./../../safaBazarDataModel/client');
const Item = require('./../../safaBazarDataModel/product');
const Order = require('./../../safaBazarDataModel/order');

function load(req, res, next, id) {
    Client.get(id)
        .then((client) => {
            req.client = client;
            return next();
        })
        .catch(e => next(e));
}

function list(req, res, next) {
    let clientId = req.client._id;
    Promise.all([
        getItemCount(clientId),
        Order.getOrgOrderCount(clientId)
    ])
        .then(result => {
            let newResult = {};
            newResult.products = result[0];
            newResult.orders = result[1];
            res.json(newResult)
        })
        .catch(e => next(e));
}

function latestOrder(req, res, next) {
    let orgId = req.org._id;

    Order.find({
        'org.orgId': orgId
    })
        .sort({ 'createdAt': -1 })
        .limit(5)
        .then(result => {
            let newResult = Order.convertToOrgOrder(result, orgId);
            res.json(newResult);
        })
        .catch(e => next(e));
}

function getItemCount(clientId) {
    return Item.count({ 'client.clientId': clientId});
}


module.exports = { load, list, latestOrder };