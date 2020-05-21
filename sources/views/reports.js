import { JetView } from "webix-jet";
import { goods } from "../models/goods";
import { goods_categories } from "../models/goods_categories";
import { suppliers } from "../models/suppliers";
import { users } from "../models/users";
import TableReportPopup from "./tableReportPopup";
import moment from "moment";

export default class ReportsView extends JetView {
	constructor(app, name) {
		super(app, name);
		this.columnsExportRealization = {
			"name": { id: "name", header: "Продукт" },
			"articul": { id: "articul", header: "Артикль" },
			"brand": { id: "brand", header: "Бренд" },
			"category": { id: "category", header: "Категория" },
			"manuf_country": { id: "manuf_country", header: "Страна производитель" },
			"date_realize": { id: "date_realize", header: "Дата реализации" },
			"supplier": { id: "supplier", header: "Поставщик" },
			"barcode": { id: "barcode", header: "Barcode" },
			"count": { id: "count", header: "КОл-во" },
			"total_price": { id: "total_price", header: "Общая цена" }
		};
		this.columnsExportRegistration = {
			"name": { id: "name", header: "Продукт" },
			"articul": { id: "articul", header: "Артикль" },
			"brand": { id: "brand", header: "Бренд" },
			"manuf_country": { id: "manuf_country", header: "Страна производитель" },
			"date_registration": { id: "date_registration", header: "Дата регистрации" },
			"barcode": { id: "barcode", header: "Barcode" },
			"total_count": { id: "total_count", header: "Общее кол-во" },
			"price": { id: "price", header: "Цена" }
		};
		this.datatableData = [];
		this.visibleTable = null;
	}

	config() {
		const _ = this.app.getService("locale")._;

		const toolbar = {
			view: "toolbar",
			padding: 20,
			elements: [
				{ view: "icon", icon: "mdi mdi-clipboard-text", css: "mdi-toolbar-icons", width: 70, height: 40 },
				{ view: "label", label: _("Отчеты"), align: "left" }
			],
			css: "main-layout-toolbar"
		};

		const tabbar = {
			view: "tabbar",
			value: "realizingReports",
			options: [
				{ "id": "realizingReports", "value": "Отчет о реализации продуктов" },
				{ "id": "registrationReports", "value": "Отчет о регистрации продуктов" }
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
				{ id: "name", header: "Продукт", fillspace: 2 },
				{
					id: "date_realize", header: [
						"Дата реализации", { content: "dateRangeFilter" }],
					fillspace: 1, template: (obj) => moment(obj.date_realize).format("DD-MMM-YYYY")
				},
				{ id: "articul", header: "Артикль", adjust: true },
				{ id: "count", header: "Кол-во", adjust: true },
				{ id: "total_price", header: "Общая цена", width: 150 },
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
				{ id: "id", header: "№", width: 50 },
				{ id: "name", header: "Продукт", fillspace: true },
				{ id: "articul", header: "Артикль", adjust: true },
				{ id: "total_count", header: "Кол-во", adjust: true },
				{ id: "price", header: "Общая цена", width: 150 },
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
									label: _("Вы можете экспортировать данные из таблицы в:"),
									inputWidth: 350,
									align: "right"
									// width: 350
								},
								{ width: 10 },
								{
									view: "button", label: _("PDF"), type: "icon", css: "button-icon",
									inputWidth: 90,
									align: "left",
									width: 90,
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
									view: "button", label: _("Excel"), type: "icon", css: "button-icon",
									inputWidth: 90,
									width: 90,
									align: "left",
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
								},
								{ width: 20 },
								// {
								// 	view: "daterangepicker",
								// 	name: "daterange",
								// 	labelWidth: 150,
								// 	label: "Выберите период:",
								// 	on: {
								// 		onChange: (newV) => {
								// 			if (newV.start && newV.end) {
								// 				const realization_reports_datatable = this.getRoot().queryView({ realization_reports_datatable: true });
								// 				const registration_reports_datatable = this.getRoot().queryView({ registration_reports_datatable: true });
								// 				let isRegistrationTable = false;
								// 				const result = this.datatableData.filter((obj) => {
								// 					if (obj.date_realize) {
								// 						isRegistrationTable = false;
								// 						if (new Date(Date.parse(obj.date_realize)) < newV.end &&
								// 							new Date(Date.parse(obj.date_realize)) > newV.start)
								// 							return true;
								// 						else return false;
								// 					} else if (obj.date_registration) {
								// 						isRegistrationTable = true;
								// 						if (new Date(Date.parse(obj.date_registration)) < newV.end &&
								// 							new Date(Date.parse(obj.date_registration)) > newV.start)
								// 							return true;
								// 						else return false;
								// 					}
								// 				});
								// 				debugger
								// 				if (isRegistrationTable) {
								// 					registration_reports_datatable.parse(result);
								// 				} else {
								// 					realization_reports_datatable.parse(result);
								// 				}
								// 				// debugger
								// 				// this.visibleTable.parse(result);
								// 			}
								// 		}
								// 	}
								// }
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
						obj.date_realize = new Date(Date.parse(obj.date_realize));
						return obj;
					});
					this.datatableData = result;
					this.visibleTable = realization_reports_datatable;
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
						obj.date_registration = new Date(Date.parse(obj.date_registration));
						return obj;
					});
					this.datatableData = result;
					this.visibleTable = registration_reports_datatable;
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