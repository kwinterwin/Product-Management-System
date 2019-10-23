
const con = require("../../server");

// console.log(con);

// con.con.query("select * from prms.user_logindata", (err, result) => {
// 	console.log(result);
// });

let usersData = {

	// createTable(con, con1){
	// 	con.query("CREATE TABLE if not exists `library`.`users` (" +
	//     "  `users_name` VARCHAR(20) DEFAULT NULL," +
	//     "  `users_surname` VARCHAR(25) DEFAULT NULL," +
	//     "  `users_patronymic` VARCHAR(20) DEFAULT NULL," +
	//     "  `passport` VARCHAR(12) DEFAULT NULL," +
	//     "  `birthday` VARCHAR(25) DEFAULT NULL," +
	//     "  `address` VARCHAR(100) DEFAULT NULL," +
	//     "  `phone` VARCHAR(60) DEFAULT NULL," +
	//     "  `card_number` INT(11) DEFAULT NULL," +
	//     "  `users_id` INT NOT NULL AUTO_INCREMENT," +
	//     "  `login` VARCHAR(20) NOT NULL," +
	//     "  `password` VARCHAR(20) NOT NULL," +
	//     "  `role` VARCHAR(20) NOT NULL," +
	//     "  PRIMARY KEY (`users_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;", (err,result)=>{
	// 		if (err) throw err;
	// 		if(result.warningCount === 0){
	// 			console.log("Table 'users' is created");
	// 			this.startInitTable(con1);
	// 		}	
	// 	});
	// },

	// startInitTable(con){
	// 	let data = [
	// 		"INSERT INTO `library`.`users` (`users_name`, `users_surname`, `users_patronymic`, `passport`, `birthday`, `address`, `phone`, `card_number`, `users_id`, `login`, `password`, `role`) VALUES ('Анна', 'Самусева', 'Сергеевна', 'АВ2824845', '1997-12-27', 'Майская, д.14 кв.90', '375297226164', '000000001', '1', 'anna', '1997anna', 'librarian');",
	// 		"INSERT INTO `library`.`users` (`users_name`, `users_surname`, `users_patronymic`, `passport`, `birthday`, `address`, `phone`, `card_number`, `users_id`, `login`, `password`, `role`) VALUES ('Евгений', 'Козлов', 'Николаевич', 'СВ2556698', '1995-10-28', 'Кавалерийская д.15, кв.105', '375298566589, 80295695956', '000000002', '2', 'evg', '123', 'user');", 
	// 		"INSERT INTO `library`.`users` (`users_name`, `users_surname`, `users_patronymic`, `passport`, `birthday`, `address`, `phone`, `card_number`, `users_id`, `login`, `password`, `role`) VALUES ('Дмитрий', 'Осин', 'Павлович', 'АВ2625269', '1996-05-28', 'ул.Елецкая, д.3, кв.18', '79033161480', '000000003', '3', 'dimon', '1', 'admin');"
	// 	];
	// 	for(let i=0; i<data.length; i++){
	// 		con.query(data[i], function(err){
	// 			if (err) throw err;
	// 		});
	// 	}
	// 	console.log("Table users is initialized");
	// },

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
				res.send(null);
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
		let query = "SELECT * FROM prms.user_logindata where login=" + req.body.login;
		con.con.query(query, (err, result) => {
			// console.log(result);
			if (!result || result.length !== 0) {
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

		// if (req.query.hasOwnProperty("login")) {
		// 	let query = `select * from users where login='${req.query.login}';`;
		// 	con.con.query(query, (err, result) => {
		// 		if (err) {
		// 			res.status(500).send(err);
		// 			console.log(err);
		// 		}
		// 		else {
		// 			res.send(result);
		// 		}
		// 	});
		// }
		// else if (req.query.hasOwnProperty("all")) {
		// 	let query = `select * from users;`;
		// 	con.con.query(query, (err, result) => {
		// 		if (err) {
		// 			res.status(500).send(err);
		// 			console.log(err);
		// 		}
		// 		else {
		// 			res.send(result);
		// 		}
		// 	});
		// }
		// else {
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
