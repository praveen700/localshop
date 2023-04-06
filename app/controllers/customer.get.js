const sql = require("../models/db");
const qu = require("../Querys/customer.query");
module.exports = {
    fetchCustomer: async (req, res, next) => {
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


};





