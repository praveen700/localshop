const sql = require("../models/db");
const qu = require("../Querys/products.query");
module.exports = {
    fetchProduct: async (req, res, next) => {
        await sql.query(qu.searchCount(req.query.search), (err, totalCount) => {
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
    createProduct: async(req, res, next) => {
        await sql.query(qu.insertProducts(req.body), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            }else{
                res.status(200).json({ status: true, data: "Product Created Successfully" })
            }
        })

    },
    updateProducts: async(req, res, next) => {
        console.log(req.body, "req.params.id");
        await sql.query(qu.updateProducts(req.body, req.params.id), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            }else{
                res.status(200).json({ status: true, data: "Product Updated Successfully" })
            }
        })

    },
    fetchCateogeryWise: async(req, res, next)=>{
        let query = await qu.fetchProductsBasedOnCategory(req.query.categoryType)
        await sql.query(query, (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            }else{
                res.status(200).json({ status: true, data: data })
            }
        })
    },
    delteProductByID: async(req, res, next) => {
        await sql.query(qu.deleteProducts(req.params.id), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            }else{
                res.status(200).json({ status: true, data: "Product Deleted Successfully" })
            }
        })

    },
};





