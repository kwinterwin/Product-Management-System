const con = require("../../server");

let reportsData = {

    getAllRealizeReport(req, res) {
        const query = "select rr.* from prms.realize_reports as rr";
        con.con.query(query, (err, result) => {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            }
            else {
                res.json(result);
            }
        });
    },

    getAllRegistrationReport(req, res) {
        const query = "SELECT * FROM prms.registration_reports";
        con.con.query(query, (err, result) => {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            }
            else {
                res.json(result);
            }
        });
    },

    addRealizeReport(req, res) {
        const report_data = req.body;
        const query = `INSERT INTO prms.realize_reports (user_id, good_id, count, total_price, date_realize) VALUES
                        (${report_data.user_id}, ${report_data.good_id},${report_data.count}, ${report_data.total_price}, 
                        "${report_data.date_realize}")`;
        con.con.query(query, (err, result) => {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            }
            else {
                res.json(result);
            }
        });
    },
};
module.exports = reportsData;