import { JetView } from "webix-jet";
import { goods_categories } from "../models/goods_categories";
import { goods } from "../models/goods";
import { proposals } from "../models/proposals";

export default class ProductRegistrationView extends JetView {
	constructor(app, name) {
		super(app, name);
		this.comboOptions = [];
	}

	config() {
		const _ = this.app.getService("locale")._;

		const registrationCombo = {
			view: "combo",
			label: "Please, choose number of good's proposal",
			labelWidth: 300,
			options: {
				body: {
					template: "#id#"
				}
			},
			on: {
				onChange: (id) => {
					const form = this.getRoot().queryView({ view: "form" });
					const comboList = this.getRoot().queryView({ view: "combo" }).getList();
					const value = comboList.getItem(id);
					const emptyLayout = this.getRoot().queryView({ emptyLayout: true });
					if (!form.isVisible()) {
						form.show();
						emptyLayout.hide();
					}
					form.setValues(value);
				}
			}
		};

		const form = {
			view: "form",
			borderless: true,
			hidden: true,
			elements: [
				{ view: "text", label: _("Product name"), name: "name", labelWidth: 200, required: true },
				{ view: "text", label: _("Сountry of production"), name: "manuf_country", labelWidth: 200, required: true },
				{
					cols: [
						{ view: "counter", label: _("Price"), name: "price", labelWidth: 200, required: true },
						{ view: "label", label: "$", css: "dollar-label" }
					],
					css: "productRegistrationLayout"
				},
				{ view: "text", label: _("Barcode (13)"), name: "barcode", labelWidth: 200, required: true },
				{ view: "text", label: _("Brand"), name: "brand", labelWidth: 200, required: true },
				{ view: "text", label: _("Article"), name: "articul", labelWidth: 200, required: true },
				{
					view: "richselect", label: _("Category"), name: "category_id", labelWidth: 200,
					options: { body: { data: goods_categories, template: "#name#" } }, required: true
				},
				{ view: "counter", label: _("Count"), name: "count", labelWidth: 200, required: true },
				{
					view: "button", value: _("Save"), inputWidth: 200, align: "right",
					click: () => {
						const form = this.getRoot().queryView({ view: "form" });
						if (form.validate()) {
							const values = form.getValues();
							debugger
							// goods.add(values);
							// form.clear();
						}
					}
				},
				{}
			],
			rules: {
				"surname": function (value) {
					return !/[^-А-ЯA-Z\x27а-яa-z]/.test(value);
				},
				"manuf_country": function (value) {
					return !/[^-А-ЯA-Z\x27а-яa-z]/.test(value);
				},
				"price": webix.rules.isNumber,
				"barcode": (value) => {
					return /\d{13}/.test(value);
				},
				"count": (value) => {
					return !/\d+.\d/.test(value);
				}
			}
		};

		return {
			rows: [
				registrationCombo,
				{ height: 10 },
				{ emptyLayout: true },
				form
			],
			padding: 20
		};
	}

	init() {
		proposals.waitData.then(() => {
			proposals.data.each((obj) => {
				if (obj.status === "accepted") {
					this.comboOptions.push(obj);
				}
			});
			const combo = this.getRoot().queryView({ view: "combo" });
			combo.getList().parse(this.comboOptions);
		});
	}
}