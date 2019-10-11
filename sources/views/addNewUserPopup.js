import { JetView } from "webix-jet";
import { users } from "../models/users";
import { defaultImage } from "../../config";

export default class UserPopupView extends JetView {

	constructor(app, name) {
		super(app, name);
		this.defaultImg = defaultImage;
	}

	config() {
		const _ = this.app.getService("locale")._;

		const popupToolbar = {
			view: "toolbar",
			elements: [
				{ view: "label", label: _("Add new user"), align: "left" },
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
				{
					view: "button", value: "Save", inputWidth: 200, align: "right",
					click: () => {
						const form = this.getRoot().queryView({ view: "form" });
						if (form.validate()) {
							const user_data = form.getValues();
							user_data.photo = null;
							users.add(user_data);
						}
					}
				},
				{ height: 10 }
			],
			borderless: true
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
                                    <span class="title">Change avatar</span>
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
						uploadInput.addEventListener("change", (event) => {
							const file = uploadInput.files[0];
							// this
							// this.defaultImg = window.URL.createObjectURL(file);
						});
					}
				}
			}
		};

		const popup = {
			view: "popup",
			width: 800,
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

	show(user) {
		const form = this.getRoot().queryView({ view: "form" });
		this.defaultImg = defaultImage;
		this.getRoot().show();
		form.clear();
		if (user) {
			form.setValues(user);
			if (user.photo) {
				this.defaultImg = user.photo;
			}
		}
		this.getRoot().queryView({ view: "template" }).refresh();
	}

	hide() {
		this.getRoot().hide();
	}
}