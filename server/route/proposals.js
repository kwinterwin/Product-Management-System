const con = require("../../server");

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
                            count = ${proposal.count}, supplier_id = ${proposal.supplier_id}, date_registration = "${proposal.date_registration}",
                            status = "${proposal.status}", date_approve = "${proposal.date_approve}"
                            where id = ${proposal.id}
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

    // deleteCategory(req, res) {
    //     const id = req.params.id;
    //     const query = `delete from prms.goods_categories where id = ${id}`;
    //     con.con.query(query, (err, result) => {
    //         if (err) {
    //             res.status(500).send(err);
    //             console.log(err);
    //         }
    //         else {
    //             res.json(result);
    //         }
    //     });
    // },

    // getAllGoods(req, res) {
    //     const query = "select * from prms.goods";
    //     con.con.query(query, (err, result) => {
    //         if (err) {
    //             res.status(500).send(err);
    //             console.log(err);
    //         }
    //         else {
    //             res.json(result);
    //         }
    //     });
    // },

    // addGood(req, res) {
    //     const good = req.body;
    //     const query = `INSERT INTO prms.goods (name, price, manuf_country, articul, category, barcode, brand, count)
    //                                    VALUES ('${good.name}', ${good.price}, '${good.manuf_country}', '${good.articul}', 
    //                                    ${good.category}, '${good.barcode}', '${good.brand}', ${good.count})`;
    //     con.con.query(query, (err, result) => {
    //         if (err) {
    //             res.status(500).send(err);
    //             console.log(err);
    //         }
    //         else {
    //             res.json(result);
    //         }
    //     });
    // },

    // getGood(req, res) {
    //     const id = req.params.id;
    //     const query = `select * from prms.goods where category=${id}`;
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
module.exports = proposalsData;