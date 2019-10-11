import { JetView } from "webix-jet";
// import { users } from "../models/users";

export default class UserPopupView extends JetView {

	constructor(app, name) {
		super(app, name);
		this.defaultImg = "https://i.stack.imgur.com/aLNNU.png";
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
				{ view: "text", label: _("Surname"), name: "surname", labelWidth: 150 },
				{ view: "text", label: _("Name"), name: "name", labelWidth: 150 },
				{ view: "text", label: _("Patronymic"), name: "patronymic", labelWidth: 150 },
				{ view: "datepicker", label: _("Date of birth"), name: "date_of_birth", labelWidth: 150 },
				{ view: "text", label: _("Phone"), name: "phone", labelWidth: 150, pattern: { mask: "+###-## ###-##-##" } },
				{ view: "text", label: _("Position"), name: "position", labelWidth: 150 },
				{ view: "button", value: "Save", inputWidth: 200, align: "right" },
				{ height: 10 }
			],
			borderless: true
		};

		const avatar_template = {
			template: `
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
                    </div>`,
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

	show() {
		this.getRoot().show();
	}

	hide() {
		this.getRoot().hide();
	}
}