// this package behaves just like the mysql one, but uses async await instead of callbacks.
const mysql = require(`mysql-await`); // npm install mysql-await

// first -- I want a connection pool: https://www.npmjs.com/package/mysql#pooling-connections
// this is used a bit differently, but I think it's just better -- especially if server is doing heavy work.
var connPool = mysql.createPool({
    connectionLimit: 5, // it's a shared resource, let's not go nuts.
    host: "127.0.0.1", // this will work
    user: "C4131F23U127",
    database: "C4131F23U127",
    password: "16179", // we really shouldn't be saving this here long-term -- and I probably shouldn't be sharing it with you...
});

// later you can use connPool.awaitQuery(query, data) -- it will return a promise for the query results.

async function addContact(name, email, date, department, subscribe) {
    // string setup this way with + because my IDE doesn't like it all as one string.
    const query = "INSERT" + " INTO contact (name, email, date, department, subscribe) VALUES (?, ?, ?, ?, ?)";
    return await connPool.awaitQuery(query, [name, email, date, department, subscribe]);
}

async function deleteContact(id) {
    const query = "DELETE" + " FROM contact WHERE id = ?";
    const result = await connPool.awaitQuery(query, [id]);
    return result.affectedRows > 0;
}

async function getContacts() {
    const query = "SELECT" + " * FROM contact";
    return await connPool.awaitQuery(query);
}

module.exports = {addContact, getContacts, deleteContact}