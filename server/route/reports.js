const con = require("../../server");

// function formatDate(isoDate) {
//     const date = new Date(Date.parse(isoDate));
//     return date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-"
//         + date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
// }

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

    // updateProposal(req, res) {
    //     const proposal = req.body;
    //     const query = `Update prms.proposals set name = "${proposal.name}", user_id = ${proposal.user_id}, category_id = ${proposal.category_id}, 
    //                         count = ${proposal.count}, supplier_id = ${proposal.supplier_id}, date_registration = "${formatDate(proposal.date_registration)}",
    //                         status = "${proposal.status}", date_approve = "${formatDate(proposal.date_approve)}"
    //                         where id = ${proposal.id}
    //                     `;
    //     con.con.query(query, (err, result) => {
    //         if (err) {
    //             res.status(500).send(err);
    //             console.log(err);
    //         }
    //         else {
    //             res.json(result);
    //         }
    //     });
    // }
};
module.exports = reportsData;