const con = require("../../server");

let goodsData = {

    getAllCategories(req, res) {
        const query = "select * from prms.goods_categories";
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

    addCategory(req, res) {
        const query = `insert into prms.goods_categories (name, parent) values ('${req.body.name}', ${req.body.parent})`;
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

    deleteCategory(req, res) {
        const id = req.params.id;
        const query = `delete from prms.goods_categories where id = ${id}`;
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

    getAllGoods(req, res) {
        const query = "select * from prms.goods";
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

    addGood(req, res) {
        const good = req.body;
        const query = `INSERT INTO prms.goods (name, price, manuf_country, articul, category, barcode, brand, count)
                                       VALUES ('${good.name}', ${good.price}, '${good.manuf_country}', '${good.articul}', 
                                       ${good.category}, '${good.barcode}', '${good.brand}', ${good.count})`;
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

    getGood(req, res) {
        const id = req.params.id;
        const query = `select * from prms.goods where category=${id}`;
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
module.exports = goodsData;