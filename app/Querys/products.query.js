const fetchQuery = (params = "", page = 1, pageSize = 3) => {
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
    if (params) {
        return {
            sql: `SELECT COUNT(*) AS total_count FROM Products WHERE CONCAT_WS(',', product_id, name, description, price, image_url) LIKE ?`,
            values: [`%${params}%`],
        }
    } else {
        return {
            sql: `SELECT COUNT(*) AS total_count FROM Products`
        }
    }
}

const insertProducts = (body) => {
    return {
        sql: `INSERT INTO Products SET ?`,
        values: body,
    }
}

const fetchProductsBasedOnCategory = (params) => {
    return{
        sql:`SELECT Products.product_id, Products.name, Products.price, Products.description, 
        Products.image_url, Categories.name AS category_name
        FROM Products
        INNER JOIN Categories ON Products.category_id = Categories.category_id
        WHERE Categories.name LIKE ?`,
        values: [`%${params}%`],
    }
}
const updateProducts = (body, product_id) => {
    return {
        sql: 'UPDATE Products SET ? WHERE product_id = ?',
        values: [body,product_id],
    }
}

const deleteProducts =(product_id) => {
    return {
        sql: 'DELETE FROM Products WHERE product_id = ?',
        values: [product_id],
    }
}

const homePageQuery = (params) => {
    if(!params){
        return{
            sql:`select p.product_id, p.name, p.description, p.price, p.image_url, c.category_id, c.name as productName from Products p join Categories c on p.category_id = c.category_id LIMIT 50`
        }
    }else{
        return{
            sql:`SELECT *
            FROM (
              SELECT p.product_id, p.name, p.description, p.price, p.image_url, c.category_id, c.name as productName
              FROM Products p
              JOIN Categories c ON p.category_id = c.category_id
              LIMIT 50
            ) AS subquery
            WHERE CONCAT_WS(',', product_id, name, description, price, image_url) LIKE ?
            `,
            values: [`%${params}%`],
        }

    }
}

const sortProducts = (category_id, sortType) => {
    return{
        sql: `select * from Products where category_id = ? ORDER BY price ${sortType};`,
        values: [category_id],
    }
}

const priceSliderQuery = (category_id, minPrice, maxPrice) => {
    return{
        sql: `SELECT * FROM Products WHERE category_id = ? AND price BETWEEN ? AND ?`,
        values: [category_id, minPrice, maxPrice]
    }
}

const getByPorductId = (product_id) => {
    return{
        sql: `SELECT * FROM Products WHERE product_id = ?`,
        values: [product_id]
    }
}



module.exports = {
    fetchQuery,
    searchCount,
    insertProducts,
    fetchProductsBasedOnCategory,
    updateProducts,
    deleteProducts,
    homePageQuery,
    sortProducts,
    priceSliderQuery,
    getByPorductId
}


