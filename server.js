const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const { DBConfig } = require("./config");
const users = require("./server/route/users");
const suppliers = require("./server/route/suppliers");
const goods = require("./server/route/goods");
const proposals = require("./server/route/proposals");
const reports = require("./server/route/reports");
const multer = require("multer");
const app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});
const port = 3000;

const con = mysql.createConnection({
	host: DBConfig.host,
	user: DBConfig.user,
	password: DBConfig.password
});

con.connect((err) => {
	if (err) throw err;
	console.log("Connected...");
});

app.use("/server", express.static("uploads"));
app.use("/server", express.static("node_modules"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: "replace this string... k12jh40918e4019u3",
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60 * 60 * 1000 }
}));


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, "img-" + Date.now() + ".jpg");
	}
});
const upload = multer({ storage: storage });

app.post("/server/avatar", upload.single("upload"), users.addAvatarFile);

app.post("/server/login", users.login);
app.post("/server/login/status", users.loginStatus);
app.post("/server/logout", users.logout);
app.post("/server/login/authorization", users.authorization);

app.get("/server/users", users.getAllUsers);
app.put("/server/users/:id", users.editData);
app.post("/server/users", users.addData);
app.delete("/server/users/:id", users.deleteUser);

app.post("/server/suppliers", suppliers.addNewSupplier);
app.get("/server/suppliers", suppliers.getAllSupliers);
app.put("/server/suppliers/:id", suppliers.updateSupplier);

app.get("/server/goods_categories", goods.getAllCategories);
app.post("/server/goods_categories", goods.addCategory);
app.delete("/server/goods_categories/:id", goods.deleteCategory);
app.post("/server/goods", goods.addGood);
app.put("/server/goods/:id", goods.updateGoodInformation);
app.get("/server/goods", goods.getAllGoods);
app.get("/server/goods/:id", goods.getGood);
app.get("/server/good/:id", goods.getGoodForId);

app.post("/server/proposals", proposals.addProposal);
app.get("/server/proposals", proposals.getAllProposals);
app.put("/server/proposals/:id", proposals.updateProposal);

app.post("/server/realize_report", reports.addRealizeReport);
app.get("/server/realize_report", reports.getAllRealizeReport);
app.get("/server/realize_group_report", reports.getAllGroupRealizeReport);

app.get("/server/registration_report", reports.getAllRegistrationReport);

app.listen(port, () => {
	console.log("Server was started on 3000 port...");
});

module.exports.con = con;