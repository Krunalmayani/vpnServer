var mysql = require('mysql2');

var db_config = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'vpn',
    waitForConnections: true
}

var connection;

function handleDisconnect() {
    console.log('call handleDisconnect 1');
    connection = mysql.createPool(db_config);

    connection.getConnection(function (err, con) {
        if (err) throw err;
        console.log("Connected !:) ");
    })

    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
            console.log('call handleDisconnect 3');
        } else {
            throw err;
        }
    });

}

handleDisconnect();

module.exports = connection;
