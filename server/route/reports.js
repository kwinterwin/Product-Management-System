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

    getAllGroupRealizeReport(req, res){
        const query = "SELECT category_id, sum(count) as result FROM prms.realize_reports group by category_id order by result DESC";
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
        let query = `select category_id from prms.goods where id=${report_data.good_id}`;
        con.con.query(query, (err, result) => {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            }
            else {
                query = `INSERT INTO prms.realize_reports (user_id, good_id, count, total_price, date_realize, category_id) VALUES
                        (${report_data.user_id}, ${report_data.good_id},${report_data.count}, ${report_data.total_price}, 
                        "${report_data.date_realize}", ${result[0].category_id})`;
                con.con.query(query, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                        console.log(err);
                    }
                    else {
                        res.json(result);
                    }
                });
            }
        });
    },
};
module.exports = reportsData;