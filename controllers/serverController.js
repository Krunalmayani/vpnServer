const { validationResult } = require("express-validator");
var connection = require("../db").promise();



exports.getAllServer = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const [row] = await connection.execute("SELECT  id,name,country,config_udp,config_tcp  FROM vpnserver");

        return res.json({ success: true, status: "Vpn list fetch", success: true, data: row })

    } catch (error) {
        console.log('error ::L', error);
    }
}