import { JetView } from "webix-jet";
import { goods_categories } from "../models/goods_categories";
import { goods } from "../models/goods";
import GoodInformationPopupView from "./goodInformationPopup";

export default class GoodsReleasingView extends JetView {
	config() {

		const _ = this.app.getService("locale")._;

		const toolbar = {
			view: "toolbar",
			padding: 20,
			elements: [
				{ view: "icon", icon: "mdi mdi-truck", css: "mdi-toolbar-icons", width: 70, height: 40 },
				{ view: "label", label: _("Goods releasing"), align: "left" }
			],
			css: "main-layout-toolbar"
		};

		const richselect = {
			view: "richselect",
			label: _("Please, select a needfull category"),
			options: {
				body: {
					data: goods_categories,
					template: "#name#"
				}
			},
			labelPosition: "top",
			on: {
				onChange: (id) => {
					const form = this.getRoot().queryView({ view: "form" });
					if (form.isVisible()) {
						form.hide();
					}
					webix.ajax().get("/server/goods/" + id).then((result) => {
						const datatable = this.getRoot().queryView({ view: "datatable" });
						const barcode = this.getRoot().queryView({ view: "text" });
						const emptyField = this.getRoot().queryView({ emptyField: true });
						datatable.clearAll();
						datatable.parse(result.json());
						datatable.refresh();
						if (!datatable.isVisible()) {
							datatable.show();
							if (emptyField.isVisible()) {
								emptyField.hide();
							}
							if (!barcode.isVisible()) {
								barcode.show();
							}
						}
					});
				}
			}
		};

		const barcode = {
			view: "text",
			hidden: true,
			label: _("You can enter barcode of product"),
			labelWidth: 300,
			on: {
				onTimedKeyPress: () => {
					const text = this.getRoot().queryView({ view: "text" });
					const textValue = text.getValue();
					const datatable = this.getRoot().queryView({ view: "datatable" });
					datatable.filter((obj) => {
						return obj.barcode.toString().indexOf(textValue) != -1;
					});
				}
			}
		};

		const datatable = {
			view: "datatable",
			hidden: true,
			select: true,
			columns: [
				{ id: "name", header: _("Product name"), fillspace: true },
				{ id: "manuf_country", header: _("Сountry of production"), adjust: true },
				{ id: "price", header: _("Price"), adjust: true },
				{ id: "total_count", header: _("Count"), adjust: true },
				{ id: "editInformation", header: "", template: "<i class='mdi mdi-eye'></i>", width: 40 }
			],
			onClick: {
				"mdi-eye": (event, obj) => {
					const datatable = this.getRoot().queryView({ view: "datatable" });
					const good = datatable.getItem(obj.row);
					this.goodsInformationPopup.show(good);
				}
			},
			on: {
				onAfterSelect: () => {
					const form = this.getRoot().queryView({ view: "form" });
					form.clear();
					if (!form.isVisible()) {
						form.show();
					}
				}
			}
		};

		const priceLabel = {
			view: "label",
			value: "0$",
			priceLabel: true,
			width: 100
		};

		const form = {
			view: "form",
			hidden: true,
			borderless: true,
			elements: [
				{
					cols: [
						{
							view: "counter", label: _("Enter count of realizing product"), labelWidth: 350, required: true, name: "count", on: {
								onChange: (newValue) => {
									if (/\d+.\d/.test(newValue)) {
										webix.message({ type: "error", text: _("The quantity of goods cannot be a fractional number.") });
										const form = this.getRoot().queryView({ view: "form" });
										form.clear();
									}
									else {
										const priceLabel = this.getRoot().queryView({ priceLabel: true });
										const datatable = this.getRoot().queryView({ view: "datatable" });
										const selectedItem = datatable.getSelectedItem();
										const total_price = parseFloat(selectedItem.price) * parseInt(newValue);
										priceLabel.setValue(`${total_price} $`);
									}
								},
								onTimedKeyPress: () => {
									const priceLabel = this.getRoot().queryView({ priceLabel: true });
									const datatable = this.getRoot().queryView({ view: "datatable" });
									const selectedItem = datatable.getSelectedItem();
									const counter = this.getRoot().queryView({ view: "counter" });
									const value = counter.getValue();
									if (!isNaN(value)) {
										const total_price = parseFloat(selectedItem.price) * parseInt(value);
										priceLabel.setValue(`${total_price} $`);
									}
								}
							}
						},
						priceLabel
					]
				},
				{
					view: "button", value: _("Realize"), inputWidth: 200, align: "right", click: () => {
						debugger
						const form = this.getRoot().queryView({ view: "form" });
						const datatable = this.getRoot().queryView({ view: "datatable" });
						const selectedItem = datatable.getSelectedItem();
						if (form.validate()) {
							const values = form.getValues();
							if (selectedItem.total_count < values.count) {
								webix.message({ type: "error", text: _("The entered quantity is more than stored in the warehouse!") });
							}
							else {
								const item = goods.getItem(selectedItem.id);
								const user = this.app.getService("user").getUser();
								const reports_data = {
									user_id: user.user_id,
									good_id: item.id,
									count: values.count,
									total_price: parseInt(values.count) * parseFloat(item.price),
									date_realize: new Date()
								};
								item.total_count -= values.count;
								goods.updateItem(item.id, item);
								datatable.updateItem(item.id, item);
								form.clear();
								webix.ajax().post("/server/realize_report", reports_data)
									.then((result) => {
										if (result.json().insertId) {
											webix.message({
												type: "success",
												text: _("The deal is registered. A report about it can be seen in the 'Reports' section.")
											});
										}
										else {
											webix.message({
												type: "error",
												text: _("The deal isn't registered.")
											});
										}
									});
							}
						}
					}
				}
			],
			rules: {
				"count": (value) => {
					return (webix.rules.isNumber(value) && value !== 0);
				}
			}
		};

		return {
			rows: [
				toolbar, {
					rows: [
						richselect,
						barcode,
						{ height: 10 },
						datatable,
						{ height: 10 },
						{ emptyField: true },
						form
					],
					padding: 20
				}
			]
		};
	}

	init() {
		this.goodsInformationPopup = this.ui(GoodInformationPopupView);
	}
}