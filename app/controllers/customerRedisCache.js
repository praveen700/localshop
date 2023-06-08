const Redis = require("redis");

const redisCLient = Redis.createClient({ socket: { port: 6360 } });
const DEFAULT_EXPIRATION = 3600;
redisCLient.connect();

function getorSetCache(key, cb) {
    return new Promise((reslove, reject) => {
        redisCLient.get(key, async (error, data) => {
            if (error) return reject(error);
            if (data !== null) return reslove(JSON.parse(data));
            const newData = await cb();
            redisCLient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(newData));
            reslove(newData);

        })

    })

}

module.exports = {
    getorSetCache,
    custID
}