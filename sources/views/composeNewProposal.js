import { JetView } from "webix-jet";
import { goods_categories } from "../models/goods_categories";
import { suppliers } from "../models/suppliers";
import { proposals } from "../models/proposals";

export default class ComposeNewProposalView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const toolbar = {
			view: "toolbar",
			padding: 20,
			elements: [
				{ view: "icon", icon: "mdi mdi-ballot", css: "mdi-toolbar-icons", width: 70, height: 40 },
				{ view: "label", label: _("Compose a new proposal"), align: "left" }
			],
			css: "main-layout-toolbar"
		};

		const form = {
			view: "form",
			elements: [
				{ view: "text", name: "name", required: true, labelWidth: 200, label: _("Product's name") },
				{
					view: "richselect",
					label: _("Category"),
					labelWidth: 200,
					name: "category_id",
					options: {
						body: {
							data: goods_categories,
							template: "#name#"
						}
					}, required: true
				},
				{ view: "counter", label: _("Count"), name: "count", labelWidth: 200, required: true },
				{
					view: "richselect",
					label: _("Supplier"),
					labelWidth: 200,
					name: "supplier_id",
					options: {
						body: {
							data: suppliers,
							template: "#supplier_name#"
						}
					}, required: true
				},
				{
					view: "button", value: _("Compose"), inputWidth: 300, align: "right", click: () => {
						const user = this.app.getService("user");
						const form = this.getRoot().queryView({ view: "form" });
						if (form.validate()) {
							const values = form.getValues();
							values.date_registration = new Date();
							values.user_id = user.getUser().user_id;
							values.status = "unreviewed";
							proposals.add(values);
							form.clear();
							webix.message({ type: "success", text: _("Proposal was successfully registrated. Please, wait approvement from admin.") });
						}
					}
				},
				{}
			]
		};

		return {
			rows: [
				toolbar,
				form
			]
		};
	}
}