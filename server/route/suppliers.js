const con = require("../../server");

const suppliersData = {

    addNewSupplier(req, res) {
        const supplier = req.body;
        const query = `
            insert into prms.suppliers (supplier_name, tin, checkpoint, address, 
                surname, name, patronymic, phone, email, fax) 
            values ('${supplier.supplier_name}','${supplier.tin}','${supplier.checkpoint}','${supplier.address}',
                '${supplier.surname}','${supplier.name}','${supplier.patronymic}', '${supplier.phone}', '${supplier.email}', '${supplier.fax}')
        `;
        con.con.query(query,
            (err, result) => {
                if (err) throw err;
                else res.json(result);
            });
    },

    getAllSupliers(req, res) {
        con.con.query("select * from prms.suppliers", (err, result) => {
            if (err) throw err;
            else res.json(result);
        });
    },

    updateSupplier(req, res) {
        const supplier = req.body;
        const query = `
            update prms.suppliers set
                supplier_name='${supplier.supplier_name}',tin='${supplier.tin}',checkpoint='${supplier.checkpoint}',address='${supplier.address}',
                surname='${supplier.surname}',name='${supplier.name}',patronymic='${supplier.patronymic}',
                phone='${supplier.phone}', email='${supplier.email}', fax='${supplier.fax}' where id=${supplier.id}`;
        con.con.query(query,
            (err, result) => {
                if (err) throw err;
                else res.json(result);
            });
    }
};

module.exports = suppliersData;