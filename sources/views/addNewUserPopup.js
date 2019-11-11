import { JetView } from "webix-jet";
import { users } from "../models/users";
import { defaultImage } from "../../config";

export default class UserPopupView extends JetView {

	constructor(app, name) {
		super(app, name);
		this.defaultImg = defaultImage;
		this.photo = null;
	}

	config() {
		const _ = this.app.getService("locale")._;

		const popupToolbar = {
			view: "toolbar",
			elements: [
				{ view: "label", label: _("Add new user"), align: "left", headerLabel: true },
				{
					view: "icon", icon: "mdi mdi-close",
					click: () => {
						this.hide();
					}
				}
			], padding: 10
		};

		const userForm = {
			view: "form",
			elements: [
				{ view: "text", label: _("Surname"), name: "surname", labelWidth: 150, required: true },
				{ view: "text", label: _("Name"), name: "name", labelWidth: 150, required: true },
				{ view: "text", label: _("Patronymic"), name: "patronymic", labelWidth: 150, required: true },
				{ view: "datepicker", label: _("Date of birth"), name: "date_of_birth", labelWidth: 150, required: true },
				{ view: "text", label: _("Phone"), name: "phone", labelWidth: 150, pattern: { mask: "+###-## ###-##-##" }, required: true },
				{ view: "text", label: _("Position"), name: "position", labelWidth: 150, required: true },
				{ view: "text", label: _("Login"), name: "login", labelWidth: 150, required: true },
				{ view: "text", label: _("Password"), name: "password", labelWidth: 150, required: true, type: "password", },
				{
					view: "button", value: _("Save"), inputWidth: 200, align: "right",
					click: () => {
						const form = this.getRoot().queryView({ view: "form" });
						debugger
						if (form.validate()) {
							const user_data = form.getValues();
							if (this.photo) {
								const file = this.photo;
								const formData = new FormData();
								formData.append("upload", file);
								webix.ajax().post("/server/avatar", formData).then((data) => {
									user_data.photo = data.json().filename;
									this.defaultImg = `/server/${user_data.photo}`;
									this.getRoot().queryView({ view: "template" }).refresh();
									this.manipulationUserInformation(user_data);
								});
							}
							else {
								user_data.photo = null;
								this.manipulationUserInformation(user_data);
							}
						}
					}
				},
				{ height: 10 }
			],
			borderless: true,
			rules: {
				"surname": function (value) {
					return !/[^-А-ЯA-Z\x27а-яa-z]/.test(value);
				},
				"name": function (value) {
					return !/[^-А-ЯA-Z\x27а-яa-z]/.test(value);
				},
				"patronymic": function (value) {
					return !/[^-А-ЯA-Z\x27а-яa-z]/.test(value);
				},
				"phone": function (value) {
					return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
				}
			}
		};

		const avatar_template = {
			view: "template",
			template: () => {
				return `
                        <div class="avatar-block">
                        <div class="avatar">
                            <img src="${this.defaultImg}">
                        </div>
                        <div class="avatar-overlay hidden-block">
                            <div class="form-group">
                                <label class="label">
                                    <i class="mdi mdi-camera"></i>
                                    <span class="title">${_("Change avatar")}</span>
                                    <input type="file" accept="image/*">
                                </label>
                            </div>
                        </div>
                    </div>`;
			},
			width: 300,
			height: 300,
			borderless: true,
			on: {
				onAfterRender: () => {
					const $avatarBlock = document.querySelector(".avatar-block");
					if ($avatarBlock) {
						$avatarBlock.addEventListener("mouseover", () => {
							$avatarBlock.querySelector(".avatar-overlay").classList.remove("hidden-block");
						});

						$avatarBlock.addEventListener("mouseout", () => {
							$avatarBlock.querySelector(".avatar-overlay").classList.add("hidden-block");
						});
					}
					const uploadInput = $avatarBlock.querySelector("input");
					if (uploadInput) {
						uploadInput.addEventListener("change", () => {
							const file = uploadInput.files[0];
							this.photo = file;
							this.defaultImg = window.URL.createObjectURL(file);
							this.getRoot().queryView({ view: "template" }).refresh();
						});
					}
				}
			}
		};

		const popup = {
			view: "popup",
			width: 800,
			css: "user-added-popup",
			modal: true,
			position: "center",
			body: {
				rows: [
					popupToolbar,
					{ height: 15 },
					{
						cols: [
							{
								rows: [
									avatar_template
								]
							},
							userForm
						]
					}
				]
			}
		};

		return popup;
	}

	manipulationUserInformation(user_data) {
		if (this.isChange) {
			users.updateItem(user_data.id, user_data);
		}
		else {
			users.add(user_data);
		}
		this.hide();
	}

	show(user, isNewUser) {
		const form = this.getRoot().queryView({ view: "form" });
		const _ = this.app.getService("locale")._;
		this.defaultImg = defaultImage;
		this.isChange = false;
		const saveButton = form.queryView({ view: "button" });
		const headerLabel = this.getRoot().queryView({ headerLabel: true });
		const timesIcon = this.getRoot().queryView({ icon: "mdi mdi-close" });
		timesIcon.show();
		this.getRoot().show();
		form.clear();
		saveButton.setValue(_("Save"));
		headerLabel.setValue(_("Add new user"));
		if (user) {
			user.date_of_birth = new Date(Date.parse(user.date_of_birth));
			this.isChange = true;
			if (isNewUser) {
				this.isChange = false;
			}
			form.setValues(user);
			if (user.photo) {
				this.defaultImg = "/server/" + user.photo;
			}
			saveButton.setValue(_("Change"));
			headerLabel.setValue(_("Change user information"));
		}
		if (isNewUser) {
			timesIcon.hide();
		}
		this.getRoot().queryView({ view: "template" }).refresh();
	}

	hide() {
		this.getRoot().hide();
	}
}