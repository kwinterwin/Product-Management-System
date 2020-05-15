const con = require("../../server");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "pmSystem.20@gmail.com",
		pass: "Ss19710111"
	}
});

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
				let query = `select ul.*, users.position from prms.user_logindata as ul, prms.users as users where ul.id=${proposal.user_id} AND users.user_id=${proposal.user_id}`;
				con.con.query(query, (err, result) => {
					if (err) {
						res.status(500).send(err);
						console.log(err);
					}
					if (result.length == 1) {
						const mailOptions = {
							from: "'Product Management system' <pmSystem.20@gmail.com>",
							to: req.session.user.login,
							subject: "Новая заявка",
							text: "",
							html: `
                                <p>Уважаемый(-ая) ${result[0].position}.</p>
                                <p>Специалист "Леверекс Интернешнл" оформил новую заявку на закупку в Product Management system.</p>
                                <p>Чтобы проверить данные заявки и утвердить или отклонить ее, откройте программное обеспечение и выполните вход как администратор.</p>
                                <p>С уважением, Product Management System</p>
                                `
						};

						transporter.sendMail(mailOptions, (err, res) => {
							if (err) {
								console.log("Error");
							} else {
								console.log("Email sent!!");
							}
						});
					}
				});
			}
		});
	},

	updateProposal(req, res) {
		const proposal = req.body;
		if (proposal.date_completed) {
			proposal.date_completed = formatDate(proposal.date_completed);
		}
		const query = `Update prms.proposals set name = "${proposal.name}", user_id = ${proposal.user_id}, category_id = ${proposal.category_id}, 
                            count = ${proposal.count}, supplier_id = ${proposal.supplier_id},
                            date_registration = "${formatDate(proposal.date_registration)}",
                            status = "${proposal.status}", date_approve = "${formatDate(proposal.date_approve)}" 
                            ${proposal.date_completed ? (",date_completed = '" + proposal.date_completed + "'") : ""} where id = ${proposal.id}
        `;
		con.con.query(query, (err, result) => {
			if (err) {
				res.status(500).send(err);
				console.log(err);
			}
			else {
				res.json(result);
				if (proposal.status === "accepted" || proposal.status === "rejected") {
					let query = `select ul.*, users.position from prms.user_logindata as ul, prms.users as users where ul.id=${proposal.user_id} AND users.user_id=${proposal.user_id}`;
					con.con.query(query, (err, result) => {
						if (err) {
							res.status(500).send(err);
							console.log(err);
						}
						if (result.length == 1) {
							const mailOptions = {
								from: "'Product Management system' <pmSystem.20@gmail.com>",
								to: result[0].login,
								subject: proposal.status === "accepted" ? "Утверждение заявки" : "Отклонение заявки",
								text: "",
								html: `
                                <p>Уважаемый(-ая) ${result[0].position}.</p>
                                <p>Ваша заявка на закупку <b>${proposal.name}</b> была <i>${proposal.status === "accepted" ? "утверждена" : "отклонена"}</i> в Product Management system.</p>
                                <p>${proposal.status === "accepted" ?
		"Можете регистрировать товар через программное обеспечение в вашем личном кабинете." :
		"По всем вопросам обращайтесь к администратору."}</p>
                                <p>С уважением, Product Management System</p>
                                `
							};

							transporter.sendMail(mailOptions, (err, res) => {
								if (err) {
									console.log("Error");
								} else {
									console.log("Email sent!!");
								}
							});
						}
					});

				}
			}
		});
	}

};
module.exports = proposalsData;