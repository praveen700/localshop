const { bannerUrl } = require("../../constants/constants");
const sql = require("../models/db");
const qu = require("../Querys/products.query");
const { groupBy } = require("../utils/helper");
const Redis = require("redis");
const redisCLient = Redis.createClient({ socket: { port: 6360 } });
const DEFAULT_EXPIRATION = 3600;
redisCLient.connect();

module.exports = {
    fetchProduct:  async(req, res, next) => {
        const productList = await redisCLient.get(`products?page=${req.query.page}&pageSize=${req.query.pageSize}&search=${req.query.search}`);
        if (productList !==null) {
          res.status(200).json(JSON.parse(productList))
        } else {
          try {
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
                            let product = { status: true, data: data, totalCount: total }
                            res.status(200).json({ status: true, data: data, totalCount: total })
                            redisCLient.setEx(`products?page=${req.query.page}&pageSize=${req.query.pageSize}&search=${req.query.search}`, DEFAULT_EXPIRATION, JSON.stringify(product));
                          
                        }
                    })
                }
            })

          } catch(error) {
            res.status(403).json({ error: err.message });
          }
        }

        //  sql.query(qu.searchCount(req.query.search), (err, totalCount) => {
        //     if (err) {
        //         res.status(403).json({ error: err.message });
        //     } else {
        //         let querys =  qu.fetchQuery(req.query.search, req.query.page, req.query.pageSize);
        //          sql.query(querys, function (err, data) {
        //             if (err) {
        //                 res.status(403).json({ error: err.message });
        //             } else {
        //                 let total = JSON.parse(JSON.stringify(totalCount)).reduce((a) =>a.total_count)
        //                 res.status(200).json({ status: true, data: data, totalCount: total })
        //                 // redisCLient.setEx("products", DEFAULT_EXPIRATION,  JSON.stringify(data))
                      
        //             }
        //         })
        //     }
        // })
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
                res.status(200).json({ status: true, data: payloadSend, })
            }
        })
    },
    sortPorducts :  (req, res, next) => {
        sql.query(qu.sortProducts(req.params.categoryId, req.query.sortType), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            } else {
                res.status(200).json({ status: true, data: data })
            }
        })
    },
    filterProductsByPrice :(req, res, next) => {
        sql.query(qu.priceSliderQuery(req.params.categoryId, req.query.minPrice, req.query.maxPrice), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            } else {
                res.status(200).json({ status: true, data: data })
            }
        })
    },
    fetchProductById:(req, res, next)=>{
        sql.query(qu.getByPorductId(req.params.id), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            } else {
                res.status(200).json({ status: true, data: data })
            }
        })

    }
};






