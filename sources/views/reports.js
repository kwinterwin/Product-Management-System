import { JetView } from "webix-jet";
import { goods } from "../models/goods";
import { goods_categories } from "../models/goods_categories";
import { suppliers } from "../models/suppliers";
import { users } from "../models/users";
import TableReportPopup from "./tableReportPopup";

export default class ReportsView extends JetView {
	constructor(app, name) {
		super(app, name);
		this.columnsExportRealization = {
			"name": { id: "name", header: "Product" },
			"articul": { id: "articul", header: "Article" },
			"brand": { id: "brand", header: "Brand" },
			"category": { id: "category", header: "Category" },
			"manuf_country": { id: "manuf_country", header: "Manufactured country" },
			"date_realize": { id: "date_realize", header: "Date of realization" },
			"supplier": { id: "supplier", header: "Supplier" },
			"barcode": { id: "barcode", header: "Barcode" },
			"count": { id: "count", header: "Count" },
			"total_price": { id: "total_price", header: "Total price" }
		};
		this.columnsExportRegistration = {
			"name": { id: "name", header: "Product" },
			"articul": { id: "articul", header: "Article" },
			"brand": { id: "brand", header: "Brand" },
			"manuf_country": { id: "manuf_country", header: "Manufactured country" },
			"date_registration": { id: "date_registration", header: "Date of registration" },
			"barcode": { id: "barcode", header: "Barcode" },
			"total_count": { id: "total_count", header: "Total Count" },
			"price": { id: "price", header: "Price" }
		};
	}

	config() {
		const _ = this.app.getService("locale")._;

		const toolbar = {
			view: "toolbar",
			padding: 20,
			elements: [
				{ view: "icon", icon: "mdi mdi-clipboard-text", css: "mdi-toolbar-icons", width: 70, height: 40 },
				{ view: "label", label: _("Reports"), align: "left" }
			],
			css: "main-layout-toolbar"
		};

		const tabbar = {
			view: "tabbar",
			value: "realizingReports",
			options: [
				{ "id": "realizingReports", "value": "Realizing reports" },
				{ "id": "registrationReports", "value": "Registration Reports" }
			],
			on: {
				onChange: () => {
					this.parseDataInDatatable();
				}
			}
		};

		const realization_reports_datatable = {
			view: "datatable",
			realization_reports_datatable: true,
			hidden: true,
			columns: [
				{ id: "id", header: "№", width: 50 },
				{ id: "name", header: "Product", fillspace: true },
				{ id: "articul", header: "Article", adjust: true },
				{ id: "count", header: "Count", adjust: true },
				{ id: "total_price", header: "Total price", adjust: true },
				{ id: "viewInfo", header: "", template: "<i class='mdi mdi-eye'></i>", width: 40 }
			],
			onClick: {
				"mdi-eye": (event, item) => {
					const datatable = this.checkVisibleTable();
					if (datatable) {
						const report = datatable.getItem(item.row);
						this.informationPopup.show(report, true);
					}
				}
			}
		};

		const registration_reports_datatable = {
			view: "datatable",
			registration_reports_datatable: true,
			hidden: true,
			columns: [
				{ id: "name", header: "Product", fillspace: true },
				{ id: "articul", header: "Article", adjust: true },
				{ id: "total_count", header: "Count", adjust: true },
				{ id: "price", header: "Total price", adjust: true },
				{ id: "viewInfo", header: "", template: "<i class='mdi mdi-eye'></i>", width: 40 }
			],
			onClick: {
				"mdi-eye": (event, item) => {
					const datatable = this.checkVisibleTable();
					if (datatable) {
						const report = datatable.getItem(item.row);
						this.informationPopup.show(report, false);
					}
				}
			}
		};

		return {
			rows: [
				toolbar,
				tabbar,
				{
					rows: [
						{
							cols: [
								{
									view: "label",
									label: _("You can export data from this datatable into:"),
									align: "right"
								},
								{ width: 20 },
								{
									view: "button", label: _("Export to PDF"), type: "icon", css: "button-icon",
									inputWidth: 200, align: "right", width: 200,
									icon: "mdi mdi-file-pdf",
									click: () => {
										const datatable = this.checkVisibleTable();
										if (datatable.config.realization_reports_datatable) {
											webix.toPDF(datatable, {
												filterHTML: true,
												autowidth: true,
												columns: this.columnsExportRealization
											});
										}
										else {
											webix.toPDF(datatable, {
												filterHTML: true,
												autowidth: true,
												columns: this.columnsExportRegistration
											});
										}
									}
								},
								{ width: 20 },
								{
									view: "button", label: _("Export to Excel"), type: "icon", css: "button-icon",
									inputWidth: 200, width: 200,
									icon: "mdi mdi-file-excel",
									click: () => {
										const datatable = this.checkVisibleTable();
										if (datatable.config.realization_reports_datatable) {
											webix.toExcel(datatable, {
												filterHTML: true,
												autowidth: true,
												columns: this.columnsExportRealization
											});
										}
										else {
											webix.toExcel(datatable, {
												filterHTML: true,
												autowidth: true,
												columns: this.columnsExportRegistration
											});
										}
									}
								}
							],
							padding: 10
						},
						registration_reports_datatable,
						realization_reports_datatable
					]
				}
			]
		};
	}

	init() {
		Promise.all([
			goods.waitData,
			goods_categories.waitData,
			suppliers.waitData
		]).then(() => {
			this.parseDataInDatatable();
		});
		this.informationPopup = this.ui(TableReportPopup);
	}

	checkVisibleTable() {
		const realization_reports_datatable = this.getRoot().queryView({ realization_reports_datatable: true });
		const registration_reports_datatable = this.getRoot().queryView({ registration_reports_datatable: true });
		if (realization_reports_datatable.isVisible()) {
			return realization_reports_datatable;
		}
		else if (registration_reports_datatable.isVisible()) {
			return registration_reports_datatable;
		}
		else return false;
	}

	parseDataInDatatable() {
		const tabbar = this.getRoot().queryView({ view: "tabbar" });
		const tabbarValue = tabbar.getValue();
		const realization_reports_datatable = this.getRoot().queryView({ realization_reports_datatable: true });
		const registration_reports_datatable = this.getRoot().queryView({ registration_reports_datatable: true });
		if (tabbarValue === "realizingReports") {
			if (!realization_reports_datatable.count()) {
				webix.ajax().get("/server/realize_report").then((result) => {
					result = result.json();
					result = result.map((obj) => {
						const good_item = goods.getItem(obj.good_id);
						const resultObj = Object.keys(good_item).reduce(function (obj, k) {
							if (k != "id") obj[k] = good_item[k];
							return obj;
						}, {});
						Object.assign(obj, resultObj);
						obj.category = goods_categories.getItem(obj.category_id).name;
						obj.supplier = suppliers.getItem(obj.supplier_id).name;
						obj.date_realize = this.formatDate(obj.date_realize);
						return obj;
					});
					realization_reports_datatable.parse(result);
				});
			}
			if (!realization_reports_datatable.isVisible()) {
				realization_reports_datatable.show();
			}
			if (registration_reports_datatable.isVisible()) {
				registration_reports_datatable.hide();
			}
		}
		else {
			if (!registration_reports_datatable.count()) {
				webix.ajax().get("/server/registration_report").then((result) => {
					result = result.json();
					result = result.map((obj) => {
						const good_item = goods.getItem(obj.good_id);
						const resultObj = Object.keys(good_item).reduce(function (obj, k) {
							if (k != "id") obj[k] = good_item[k];
							return obj;
						}, {});
						Object.assign(obj, resultObj);
						users.data.each((user) => {
							if (user.user_id === obj.user_id) {
								obj.user = user;
							}
						});
						obj.date_registration = this.formatDate(obj.date_registration, true);
						return obj;
					});
					registration_reports_datatable.parse(result);
				});
			}
			if (!registration_reports_datatable.isVisible()) {
				registration_reports_datatable.show();
			}
			if (realization_reports_datatable.isVisible()) {
				realization_reports_datatable.hide();
			}
		}
	}

	formatDate(isoDate, isReturnStringFormat) {
		const date = new Date(Date.parse(isoDate));
		if (isReturnStringFormat)
			return date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-"
				+ date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
		else return date;
	}

}