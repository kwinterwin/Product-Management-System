import { JetView } from "webix-jet";

export default class LoginView extends JetView {

	config() {
		const _ = this.app.getService("locale")._;
		const login_toolbar = {
			view: "toolbar",
			paddingX: 70,
			css: "grayToolbar",
			cols: [
				{ view: "label", label: _("Product Management System"), align: "left" },
				{
					view: "button", label: _("Sign in"), width: 150, inputWidth: 150, align: "right", click: () => {
						if (this.$$("loginForm").isVisible() === false) {
							this.$$("loginForm").show();
							this.$$("registerForm").hide();
						}
					}
				},
				{ width: 15 },
				{
					view: "button", label: _("Register"), width: 200, inputWidth: 200, align: "right", click: () => {
						if (this.$$("registerForm").isVisible() === false) {
							this.$$("loginForm").hide();
							this.$$("registerForm").show();
						}
					}
				}
			]
		};


		const login_form = {
			view: "form",
			localId: "loginForm",
			width: 700,
			css: "form",
			paddingX: 90,
			elements: [
				{ view: "template", template: _("Sign in"), type: "header", borderless: true },
				{ view: "text", label: _("Login"), name: "login", labelWidth: 150, invalidMessage: "Login can't be empty." },
				{ view: "text", label: _("Password"), type: "password", name: "password", labelWidth: 150, invalidMessage: "Password can't be empty." },
				{
					cols: [
						{ width: 150 },
						{ view: "button", value: _("Sign in"), click: () => this.do_login(), hotkey: "enter", localId: "loginBtn", inputWidth: 100, width: 120 }
					]
				}
			],
			rules: {
				"login": webix.rules.isNotEmpty,
				"password": webix.rules.isNotEmpty
			}
		};

		const register_form = {
			view: "form",
			localId: "registerForm",
			width: 600,
			css: "form",
			paddingX: 90,
			hidden: true,
			elements: [
				{ view: "template", template: _("Register"), type: "header", borderless: true, localId: "header" },
				{ view: "text", label: _("Login"), name: "login", labelWidth: 200, invalidMessage: _("Login can't be empty."), localId: "loginField" },
				{ view: "text", label: _("Password"), type: "password", name: "password", labelWidth: 200, invalidMessage: _("Password can't be empty.") },
				{
					view: "text", label: _("Confirm password"), type: "password", name: "confirm_password", labelWidth: 200, invalidMessage: _("This field can't be empty.")
				},
				{
					cols: [
						{ width: 150 },
						{ view: "button", value: _("Register"), click: () => { this.authorization(); }, hotkey: "enter", localId: "authorizBtn", inputWidth: 200, align:"right" }
					]
				}
			],
			rules: {
				"login": webix.rules.isNotEmpty,
				"password": webix.rules.isNotEmpty
			}
		};

		return {
			rows: [
				login_toolbar,
				{ height: 40 },
				{
					cols: [
						{}, login_form, register_form, {}
					]
				}, {}
			]
		};
	}

	init(view) {
		view.$view.querySelector("input").focus();
	}

	authorization() {
		const _ = this.app.getService("locale")._;
		const form = this.$$("registerForm");
		const data = form.getValues();
		if (data.password === data.confirm_password) {
			delete data.confirm_password;
			if (form.validate()) {
				webix.ajax().post("/server/login/authorization", data).then((result) => {
					if (result.json().hasOwnProperty("message")) {
						webix.message({ type: "error", text: result.json().message });
					}
					else {
						webix.message({ type: "success", text: _("Successful registration") });
						this.$$("registerForm").clear();
						this.$$("registerForm").hide();
						this.$$("loginForm").show();
					}
				});
			}
		}
		else {
			webix.message({ type: "error", text: _("Passwords do not match!") });
		}
	}

	do_login() {
		const user = this.app.getService("user");
		const form = this.$$("loginForm");
		if (form.validate()) {
			const data = form.getValues();
			user.login(data.login, data.password);
		}
	}

}