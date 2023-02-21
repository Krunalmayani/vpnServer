const { validationResult } = require("express-validator");
var connection = require("../db").promise();



exports.getAllServer = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const [row] = await connection.execute("SELECT  *  FROM vpnserver");

        return res.json({ success: true, status: "Vpn list fetch", data: row })

    } catch (error) {

        return res.json({ success: false, status: error.message })
    }
}

exports.manageServerStatus = async (req, res, next) => {

    const ids = req?.body?.serverIds;
    const id = req?.body?.id;

    try {
        const [row] = await connection.execute("SELECT * FROM application WHERE id=?", [id]);
        let oldServerID = JSON.parse(row[0].serverIds);

        const uniqueArr = [...new Set([...oldServerID, ...ids,])].sort(function (a, b) { return a - b });

        const [col] = await connection.execute(
            "UPDATE application SET serverIds=?  WHERE id=? ",
            [JSON.stringify(uniqueArr), id]
        );

        if (col?.affectedRows == 1) {
            return res.json({ success: true, status: "Record successfully updated" })
        } else {
            return res.json({ success: false, status: "Something missing" })
        }

    } catch (error) {
        return res.json({ success: false, status: error.message })
    }

}

exports.deleteAppServer = async (req, res) => {
    const ids = req?.body?.serverID;
    const id = req?.body?.id;

    try {

        const [row] = await connection.execute("SELECT * FROM application WHERE id=?", [id]);
        let oldServerID = JSON.parse(row[0].serverIds);

        const newServerID = oldServerID.filter(id => id != ids);

        const [col] = await connection.execute(
            "UPDATE application SET serverIds=?  WHERE id=? ",
            [JSON.stringify(newServerID), id]
        );

        if (col?.affectedRows == 1) {
            return res.json({ success: true, status: "Record successfully Deleted" })
        } else {
            return res.json({ success: false, status: "Something missing" })
        }

    } catch (error) {
        return res.json({ success: false, status: error.message })
    }
}

exports.getAllApp = async (req, res) => {
    try {
        const [row] = await connection.execute("SELECT  *  FROM application");

        return res.json({ success: true, status: "Application list fetch", data: row })

    } catch (error) {
        return res.json({ success: false, status: error.message })
    }
}