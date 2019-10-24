import { JetView } from "webix-jet";
import { suppliers } from "../models/suppliers";

export default class NewSupplierPopupView extends JetView {

	constructor(app, name, data) {
		super(app, name);
		this.isChange = false;
		this.supplier = null;
	}

	config() {
		const _ = this.app.getService("locale")._;

		const popupToolbar = {
			view: "toolbar",
			elements: [
				{ view: "label", label: _("Add new supplier"), align: "left", headerLabel: true },
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
					{ view: "text", label: _("Supplier name"), name: "supplier_name", labelWidth: 130, required: true },
					{
						cols: [
							{ view: "text", label: _("TIN"), name: "tin", required: true },
							{ width: 10 },
							{ view: "text", label: _("Checkpoint"), name: "checkpoint", labelWidth: 100, required: true }
						]
					},
					{ view: "textarea", label: _("Address"), name: "address", height: 100, required: true }
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
							{ view: "text", label: _("Surname"), name: "surname", required: true },
							{ width: 5 },
							{ view: "text", label: _("Name"), labelWidth: 60, name: "name", required: true },
							{ width: 5 },
							{ view: "text", label: _("Patronymic"), labelWidth: 100, name: "patronymic", required: true }
						]
					},
					{ height: 10 },
					{
						cols: [
							{ view: "text", label: _("Phone"), labelWidth: 60, name: "phone", required: true, pattern: { mask: "+###-## ###-##-##" } },
							{ width: 5 },
							{ view: "text", label: _("E-mail"), labelWidth: 60, name: "email" },
							{ width: 5 },
							{ view: "text", label: _("Fax"), labelWidth: 60, name: "fax" }
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
						view: "form",
						elements: [
							{
								rows: [
									{ height: 10 },
									commonInformation,
									{ height: 20 },
									contactInformation
								]
							},
							{
								cols: [
									{},
									{
										view: "button",
										value: "Save",
										type: "form",
										click: () => {
											const form = this.getRoot().queryView({ view: "form" });
											if (form.validate()) {
												const supplier_data = form.getValues();
												if (this.isChange) {
													suppliers.updateItem(this.supplier.id, supplier_data);
												}
												else {
													suppliers.add(supplier_data);
												}
												this.hide();
											}
										}
									},
									{}
								]
							}
						],
						rules: {
							"email": function (value) {
								if (value) {
									return webix.rules.isEmail(value);
								}
								else return true;
							},
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
					}
				]
			}
		};

		return popup;
	}

	show(supplier) {
		const _ = this.app.getService("locale")._;
		this.isChange = false;
		const form = this.getRoot().queryView({ view: "form" });
		const saveButton = this.getRoot().queryView({ view: "button" });
		const headerLabel = this.getRoot().queryView({ headerLabel: true });
		this.getRoot().show();
		form.clear();
		saveButton.setValue(_("Save"));
		headerLabel.setValue(_("Add new supplier"));
		if (supplier) {
			this.isChange = true;
			form.setValues(supplier);
			this.supplier = supplier;
			saveButton.setValue(_("Change"));
			headerLabel.setValue(_("Change supplier information"));
		}
	}

	hide() {
		this.getRoot().hide();
	}
}