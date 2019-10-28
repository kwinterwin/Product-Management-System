const con = require("../../server");

function formatDate(isoDate) {
    const date = new Date(Date.parse(isoDate));
    return date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-"
        + date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
}

let proposalsData = {

    getAllProposals(req, res) {
        const query = "select * from prms.proposals";
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

    addProposal(req, res) {
        const proposal = req.body;
        const query = `INSERT INTO prms.proposals (name, user_id, category_id, count, supplier_id, date_registration) VALUES
                        ("${proposal.name}", ${proposal.user_id},${proposal.category_id}, ${proposal.count}, 
                        ${proposal.supplier_id}, "${proposal.date_registration}");
                        `;
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

    updateProposal(req, res) {
        const proposal = req.body;
        const query = `Update prms.proposals set name = "${proposal.name}", user_id = ${proposal.user_id}, category_id = ${proposal.category_id}, 
                            count = ${proposal.count}, supplier_id = ${proposal.supplier_id}, date_registration = "${formatDate(proposal.date_registration)}",
                            status = "${proposal.status}", date_approve = "${formatDate(proposal.date_approve)}" 
                            ${proposal.date_completed ? ",date_completed = '${formatDate(proposal.date_completed)}'" : ""} where id = ${ proposal.id}
        `;
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

};
module.exports = proposalsData;