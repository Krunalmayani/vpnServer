const { validationResult } = require("express-validator");
var connection = require("../db").promise();


exports.getAllAppList = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const [row] = await connection.execute("SELECT  *  FROM application");

        return res.json({ success: true, status: "app list fetch", data: row })

    } catch (error) {

        return res.json({ success: false, status: error.message })
    }
}

exports.getAppServer = async (req, res) => {

    const errors = validationResult(req);
    let id = req?.query?.id;

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const [row] = await connection.execute("SELECT  *  FROM application where id=?", [id]);

        const rowObj = JSON.parse(row[0].serverIds);

        const cols = [];
        for (let i = 0; i < rowObj.length; i++) {

            let [rows] = await connection.execute("SELECT  *  FROM vpnserver where id=?", [rowObj[i]]);
            cols.push(rows[0]);

        }
        return res.json({ success: true, status: "fetch app server list", data: cols })

    } catch (error) {
        return res.json({ success: false, status: error.message })
    }
}
