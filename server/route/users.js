
const con = require("../../server");

let usersData = {

	login(req, res) {
		const user = {};
		user.login = req.body.user;
		user.password = req.body.pass;
		const query = `select * from prms.user_logindata where login='${user.login}' and password='${user.password}'`;
		con.con.query(query, (err, result) => {
			if (err) {
				res.status(500).send(err);
				console.log(err);
			}
			if (result.length == 1) {
				user.role = result[0].role;
				user.user_id = result[0].id;
				req.session.user = user;
				res.send(user);
			}
			else
				res.json({ type: "error", "message": "You enter incorrect login or password" });
		});
	},

	loginStatus(req, res) {
		res.send(req.session.user || null);
	},

	logout(req, res) {
		delete req.session.user;
		res.send({});
	},

	authorization: function (req, res) {
		let query = `SELECT * FROM prms.user_logindata where login='${req.body.login}'`;
		con.con.query(query, (err, result) => {
			if (!result || result.length === 0) {
				query = `INSERT INTO prms.user_logindata (login, password) 
						VALUES ("${req.body.login}", "${req.body.password}");`;
				con.con.query(query, (err) => {
					if (err) {
						res.status(500).send(err);
						console.log(err);
					}
					else
						res.json({});
				});
			}
			else res.json({ "message": "Login has already been taken." });
		});
	},

	getAllUsers(req, res) {
		const query = "SELECT users.*, logindata.* FROM prms.users as users, prms.user_logindata as logindata where users.user_id=logindata.id";
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

	editData(req, res) {
		const user = req.body;
		let query = `update prms.user_logindata set login="${user.login}", password='${user.password}' where id=${user.id}`;
		con.con.query(query, (err, result) => {
			if (err) {
				res.status(500).send(err);
				console.log(err);
			}
			else {
				query = `update prms.users set surname='${user.surname}', name='${user.name}', patronymic='${user.patronymic}', date_of_birth='${user.date_of_birth}', 
				phone='${user.phone}', position = '${user.position}', photo = '${user.photo}' where info_id=${user.info_id}`;
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

	addData(req, res) {
		const user = req.body;
		let query = `INSERT INTO prms.user_logindata (login, password) VALUES ('${user.login}', '${user.password}')`;
		con.con.query(query, (err, result) => {
			if (err) {
				res.status(500).send(err);
				console.log(err);
			}
			else {
				query = `INSERT INTO prms.users (user_id, surname, name, patronymic, date_of_birth, phone, position, photo) VALUES
											(${result.insertId},'${user.surname}','${user.name}', '${user.patronymic}', '${user.date_of_birth}', '${user.phone}', '${user.position}',
											'${user.photo}')`;
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

	addAvatarFile(req, res) {
		const file = req.file;
		res.json(file);
	},

	deleteUser(req, res) {
		const user_id = req.params.id;
		const query = `delete from prms.user_logindata where id=${user_id}`;
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

module.exports = usersData;
