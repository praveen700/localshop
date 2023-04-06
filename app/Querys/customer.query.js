const fetchQuery = (params="", page = 1, pageSize = 3) => {
    if (!params && !page && !pageSize) {
        return `SELECT * FROM Customers`;
    } else if (page && pageSize && !params) {
        const offset = (page - 1) * pageSize;
        return {
            sql: `SELECT * FROM Customers ORDER BY customer_id LIMIT ${pageSize} OFFSET ${offset}`,
            values: [pageSize, offset]
        }
    } else {
        return {
            sql: `SELECT *  FROM Customers WHERE CONCAT_WS(',', name, email, phone, shipping_address, billing_address) LIKE ?`,
            values: [`%${params}%`],
        };
    }
};

const searchCount = (params) => {
    if(params){
        return {
            sql: `SELECT COUNT(*) AS total_count FROM Customers WHERE CONCAT_WS(',', name, email, phone, shipping_address, billing_address) LIKE ?`,
            values: [`%${params}%`],
        }
    }else{
        return{
            sql: `SELECT COUNT(*) AS total_count FROM Customers`
        }

    }
}
module.exports = {
    fetchQuery,
    searchCount
}


// 
