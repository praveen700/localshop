const fetchQuery = (params="", page = 1, pageSize = 3) => {
    if (!params && !page && !pageSize) {
        return `SELECT * FROM Products`;
    } else if (page && pageSize && !params) {
        const offset = (page - 1) * pageSize;
        return {
            sql: `SELECT * FROM Products ORDER BY product_id LIMIT ${pageSize} OFFSET ${offset}`,
            values: [pageSize, offset]
        }
    } else {
        return {
            sql: `SELECT *  FROM Products WHERE CONCAT_WS(',', product_id, name, description, price, image_url) LIKE ?`,
            values: [`%${params}%`],
        };
    }
};

const searchCount = (params) => {
    if(params){
        return {
            sql: `SELECT COUNT(*) AS total_count FROM Products WHERE CONCAT_WS(',', product_id, name, description, price, image_url) LIKE ?`,
            values: [`%${params}%`],
        }
    }else{
        return{
            sql: `SELECT COUNT(*) AS total_count FROM Products`
        }
    }
}
module.exports = {
    fetchQuery,
    searchCount
}

