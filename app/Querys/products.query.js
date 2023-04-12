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

const homePageQuery = `select * from Products p join Categories c on p.category_id = c.category_id LIMIT 50`

module.exports = {
    fetchQuery,
    searchCount,
    insertProducts,
    fetchProductsBasedOnCategory,
    updateProducts,
    deleteProducts,
    homePageQuery
}
// https://www.shutterstock.com/image-vector/super-sale-header-banner-design-260nw-1663164736.jpg
// https://www.pngitem.com/pimgs/m/591-5918916_image-description-electronics-banner-images-hd-hd-png.png
// https://i.pinimg.com/originals/9a/13/dc/9a13dc79ca4368d6c87acb2e52cadf9d.jpg

