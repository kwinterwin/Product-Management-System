import { JetView } from "webix-jet";
import { goods_categories } from "../models/goods_categories";
import { goods } from "../models/goods";

export default class ProductRegistrationView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const form = {
			view: "form",
			elements: [
				{ view: "text", label: _("Product name"), name: "name", labelWidth: 200, required: true },
				{ view: "text", label: _("Сountry of production"), name: "manuf_country", labelWidth: 200, required: true },
				{ view: "counter", label: _("Price"), name: "price", labelWidth: 200, required: true },
				{ view: "text", label: _("Barcode (13)"), name: "barcode", labelWidth: 200, required: true },
				{ view: "text", label: _("Brand"), name: "brand", labelWidth: 200, required: true },
				{ view: "text", label: _("Article"), name: "articul", labelWidth: 200, required: true },
				{
					view: "richselect", label: _("Category"), name: "category", labelWidth: 200,
					options: { body: { data: goods_categories, template: "#name#" } }, required: true
				},
				{ view: "counter", label: _("Count"), name: "count", labelWidth: 200, required: true },
				{
					view: "button", value: _("Save"), inputWidth: 200, align: "right",
					click: () => {
						const form = this.getRoot().queryView({ view: "form" });
						if (form.validate()) {
							const values = form.getValues();
							goods.add(values);
							form.clear();
						}
					}
				},
				{}
			]
		};

		return {
			rows: [
				form
			]
		};
	}
}