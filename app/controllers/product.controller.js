const { bannerUrl } = require("../../constants/constants");
const sql = require("../models/db");
const qu = require("../Querys/products.query");
const { groupBy } = require("../utils/helper");
module.exports = {
    fetchProduct:  (req, res, next) => {
         sql.query(qu.searchCount(req.query.search), (err, totalCount) => {
            if (err) {
                res.status(403).json({ error: err.message });
            } else {
                let querys =  qu.fetchQuery(req.query.search, req.query.page, req.query.pageSize);
                 sql.query(querys, function (err, data) {
                    if (err) {
                        res.status(403).json({ error: err.message });
                    } else {
                        let total = JSON.parse(JSON.stringify(totalCount)).reduce((a) =>a.total_count)
                        res.status(200).json({ status: true, data: data, totalCount: total })
                    }
                })
            }
        })
    },
    createProduct: (req, res, next) => {
         sql.query(qu.insertProducts(req.body), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            }else{
                res.status(200).json({ status: true, data: "Product Created Successfully" })
            }
        })

    },
    updateProducts: (req, res, next) => {
         sql.query(qu.updateProducts(req.body, req.params.id), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            }else{
                res.status(200).json({ status: true, data: "Product Updated Successfully" })
            }
        })

    },
    fetchCateogeryWise: (req, res, next)=>{
        let query =  qu.fetchProductsBasedOnCategory(req.query.categoryType)
         sql.query(query, (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            }else{
                res.status(200).json({ status: true, data: data })
            }
        })
    },
    delteProductByID: (req, res, next) => {
         sql.query(qu.deleteProducts(req.params.id), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            }else{
                res.status(200).json({ status: true, data: "Product Deleted Successfully" })
            }
        })

    },
    landingPage: (req, res, next)=>{
         sql.query(qu.homePageQuery(req.query.search), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            }else{
                let groupedObject = groupBy(data, "productName")
                let payloadSend = {
                    ...groupedObject,
                    bannerImages: bannerUrl
                }
                res.status(200).json({ status: true, data: payloadSend })
            }
        })
    }
};





