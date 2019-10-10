import { JetView } from "webix-jet";

export default class NewSupplierPopupView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const popupToolbar = {
			view: "toolbar",
			elements: [
				{ view: "label", label: _("Add new supplier"), align: "left" },
				{
					view: "icon", icon: "mdi mdi-close",
					click: () => {
						this.hide();
					}
				}
			], padding: 10
		};

		const commonInformation = {
			view: "fieldset",
			label: _("Basic information of supplier"),
			body: {
				rows: [
					{ view: "text", label: _("Supplier name"), labelWidth: 130 },
					{
						cols: [
							{ view: "text", label: _("TIN") },
							{ width: 10 },
							{ view: "text", label: _("Checkpoint"), labelWidth: 100 }
						]
					},
					{ view: "textarea", label: _("Address"), height: 100 }
				]
			}
		};

		const contactInformation = {
			view: "fieldset",
			label: _("Contact information"),
			body: {
				rows: [
					{
						cols: [
							{ view: "text", label: _("Surname") },
							{ width: 5 },
							{ view: "text", label: _("Name"), labelWidth: 60 },
							{ width: 5 },
							{ view: "text", label: _("Patronymic"), labelWidth: 90 }
						]
					},
					{ height: 10 },
					{
						cols: [
							{ view: "text", label: _("Phone"), labelWidth: 60 },
							{ width: 5 },
							{ view: "text", label: _("E-mail"), labelWidth: 60 },
							{ width: 5 },
							{ view: "text", label: _("Fax"), labelWidth: 60 }
						]
					}
				]
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
					{
						rows: [
							{ height: 10 },
							commonInformation,
							{ height: 20 },
							contactInformation
						],
						padding: 10
					},
					{
						cols: [
							{},
							{
								view: "button",
								value: "Save",
								type: "form"
							},
							{}
						]
					},
					{ height: 10 }
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