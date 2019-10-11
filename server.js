const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
// import { DBConfig } from "./config";
const { DBConfig } = require("./config");
// const books = require("./server/route/books");
const users = require("./server/route/users");
const suppliers = require("./server/route/suppliers");
// const orders = require("./server/route/orders");
// const likes = require("./server/route/likes");
// const comments = require("./server/route/comments");
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
		cb(null, file.originalname);
	}
});
const upload = multer({ storage: storage });

// app.post("/server/books", upload.single("upload"), books.addData);
// app.get("/server/books", books.allFiles);
// app.delete("/server/books/:id", books.deleteBook);
// app.put("/server/books/:id", books.updateItem);

app.post("/server/login", users.login);
app.post("/server/login/status", users.loginStatus);
app.post("/server/logout", users.logout);
// app.post("/server/login/authorization", users.authorization);
app.get("/server/users", users.getAllUsers);
// app.put("/server/users", users.editData);
app.post("/server/users", users.addData);

app.post("/server/suppliers", suppliers.addNewSupplier);
app.get("/server/suppliers", suppliers.getAllSupliers);

// app.post("/server/orders", orders.addOrder);
// app.get("/server/orders", orders.getAllData);
// app.delete("/server/orders", orders.deleteData);

// app.get("/server/likes", likes.getData);
// app.post("/server/likes", likes.setData);

// app.get("/server/comments", comments.getData);
// app.post("/server/comments", comments.addData);

app.listen(port, () => {
	console.log("Server was started on 3000 port...");
});

module.exports.con = con;