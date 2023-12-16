const mysql = require(`mysql-await`);
var connPool = mysql.createPool({
    connectionLimit: 5,
    host: "127.0.0.1",
    user: "C4131F23U127",
    database: "C4131F23U127",
    password: "16179",
});

// the query string are done like this because my IDE doesn't like it as a single string.
async function getTweet(sort, page, pageSize) {
    const offset = (page - 1) * pageSize;
    if (sort === "date") {
        const query = "SELECT *" + " FROM tweet ORDER BY date DESC LIMIT ? OFFSET ?";
        return await connPool.awaitQuery(query, [pageSize, offset]);
    } else if (sort === "likes") {
        const query = "SELECT *" + " FROM tweet ORDER BY likes DESC LIMIT ? OFFSET ?";
        return await connPool.awaitQuery(query, [pageSize, offset]);
    }
    return null;
}

async function getNumberOfTweets() {
    const query = "SELECT COUNT(*)" + " AS total FROM tweet";
    const result = await connPool.awaitQuery(query);
    return result[0].total;
}

async function addTweet(tweet) {
    const query = "INSERT" + " INTO tweet (date, message, likes) VALUES (CURRENT_TIMESTAMP, ?, ?)";
    return await connPool.awaitQuery(query, [tweet, 0]);
}

async function likeTweet(id) {
    const query = "UPDATE" + " tweet SET likes = likes + 1 WHERE id = ?";
    const result = await connPool.awaitQuery(query, [id]);
    return result.affectedRows > 0;
}

async function editTweet(id, tweet) {
    const query = "UPDATE" + " tweet SET message = ? WHERE id = ?";
    const result = await connPool.awaitQuery(query, [tweet, id]);
    return result.affectedRows > 0;
}

async function deleteTweet(id) {
    const query = "DELETE" + " FROM tweet WHERE id = ?";
    const result = await connPool.awaitQuery(query, [id]);
    return result.affectedRows > 0;
}

module.exports = {
    getTweet,
    getNumberOfTweets,
    addTweet,
    likeTweet,
    editTweet,
    deleteTweet,
}