import { JetView } from "webix-jet";
import { goods } from "../models/goods";
import { goods_categories } from "../models/goods_categories";
import { suppliers } from "../models/suppliers";
import { users } from "../models/users";

export default class ReportsView extends JetView {
    constructor(app, name) {
        super(app, name);
        this.columnsExport = {
            "name": { id: "name", header: "Product" },
            "articul": { id: "articul", header: "Article" },
            "brand": { id: "brand", header: "Brand" },
            "category": { d: "category", header: "Category" },
            "manuf_country": { id: "manuf_country", header: "Manufactured country" },
            "date_realize": { id: "date_realize", header: "Date of realization" },
            "supplier": { id: "supplier", header: "Supplier" },
            "barcode": { id: "barcode", header: "Barcode" },
            "count": { id: "count", header: "Count" },
            "total_price": { id: "total_price", header: "Total price" }
        };
    }

    config() {
        const _ = this.app.getService("locale")._;

        const toolbar = {
            view: "toolbar",
            padding: 20,
            elements: [
                { view: "icon", icon: "mdi mdi-clipboard-text", css: "mdi-toolbar-icons", width: 70, height: 40 },
                { view: "label", label: _("Reports"), align: "left" },
                {
                    view: "button", value: "Export to PDF", click: () => {
                        const datatable = this.getRoot().queryView({ view: "datatable" });

                        webix.toPDF(datatable, {
                            filterHTML: true,
                            autowidth: true,
                            columns: this.columnsExport
                        });
                    }
                },
                {
                    view: "button", value: "Export to Excel", click: () => {
                        const datatable = this.getRoot().queryView({ view: "datatable" });
                        webix.toExcel(datatable, {
                            filterHTML: true,
                            columns: this.columnsExport
                        });
                    }
                }
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
                { id: "pdfExport", header: "", template: "<i class='mdi mdi-file-pdf'></i>", width: 40 },
                { id: "viewInfo", header: "", template: "<i class='mdi mdi-eye'></i>", width: 40 }
            ],
            onClick: {
                "mdi-file-pdf": (event, item) => {
                    const template = this.getRoot().queryView({ view: "template" });
                    const datatable = this.getRoot().queryView({ view: "datatable" });
                    const report = datatable.getItem(item.row);
                    template.parse(report);
                    webix.toPDF(template, { display: "image", filename: `Report №${report.id}` });
                    // const supplier = this.getRoot().queryView({ view: "datatable" }).getItem(item.row);
                    // this.addNewSupplierPopup.show(supplier);
                },
                "mdi-eye": (event, item) => {
                    // const supplier = this.getRoot().queryView({ view: "datatable" }).getItem(item.row);
                    // this.viewSupplierInformation.show(supplier);
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
                { id: "count", header: "Count", adjust: true },
                { id: "total_price", header: "Total price", adjust: true },
                { id: "pdfExport", header: "", template: "<i class='mdi mdi-file-pdf'></i>", width: 40 },
                { id: "viewInfo", header: "", template: "<i class='mdi mdi-eye'></i>", width: 40 }
            ],
            onClick: {
                "mdi-file-pdf": (event, item) => {
                    const template = this.getRoot().queryView({ view: "template" });
                    const datatable = this.getRoot().queryView({ view: "datatable" });
                    const report = datatable.getItem(item.row);
                    template.parse(report);
                    webix.toPDF(template, { display: "image", filename: `Report №${report.id}` });
                    // const supplier = this.getRoot().queryView({ view: "datatable" }).getItem(item.row);
                    // this.addNewSupplierPopup.show(supplier);
                },
                "mdi-eye": (event, item) => {
                    // const supplier = this.getRoot().queryView({ view: "datatable" }).getItem(item.row);
                    // this.viewSupplierInformation.show(supplier);
                }
            }
        };

        const template = {
            view: "template",
            hidden: true,
            css: "pdfTemplate",
            borderless: true,
            template: (obj) => {
                return `
                    <h3 style="text-align:center">Report about product realization</h3>
                    <p>Product: ${obj.name}:</p>
                    <p>Article: ${obj.articul}</p>
                    <p>Brand: ${obj.brand}</p>
                    <p>Category: ${obj.category}</p>
                    <p>Manufactured country: ${obj.manuf_country}</p>
                    <p>Date of realization: ${this.formatDate(obj.date_realize, true)}</p>
                    <p>Supplier: ${obj.supplier}</p>
                    <p>Barcode: ${obj.barcode}</p>
                    <p>Count: ${obj.count}</p>
                    <p>Total price: ${obj.total_price}</p>
                `;
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
                                    label: "You can export data from this datatable into:",
                                    align: "right"
                                },
                                { width: 20 },
                                {
                                    view: "button", label: "Export to PDF", type: "icon", css: "button-icon",
                                    inputWidth: 200, align: "right", width: 200,
                                    icon: "mdi mdi-file-pdf",
                                    click: () => {
                                        const datatable = this.getRoot().queryView({ view: "datatable" });
                                        webix.toPDF(datatable, {
                                            filterHTML: true,
                                            autowidth: true,
                                            columns: this.columnsExport
                                        });
                                    }
                                },
                                { width: 20 },
                                {
                                    view: "button", label: "Export to Excel", type: "icon", css: "button-icon",
                                    inputWidth: 200, width: 200,
                                    icon: "mdi mdi-file-excel",
                                    click: () => {
                                        const datatable = this.getRoot().queryView({ view: "datatable" });
                                        webix.toExcel(datatable, {
                                            filterHTML: true,
                                            columns: this.columnsExport
                                        });
                                    }
                                }
                            ],
                            padding: 10
                        },
                        registration_reports_datatable,
                        realization_reports_datatable
                    ]
                },
                template
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
            // const tabbar = this.getRoot().queryView({ view: "tabbar" });
            // const tabbarValue = tabbar.getValue();
            // const realization_reports_datatable = this.getRoot().queryView({ realization_reports_datatable: true });
            // const registration_reports_datatable = this.getRoot().queryView({ registration_reports_datatable: true });
            // if (tabbarValue === "realizingReports") {
            //     webix.ajax().get("/server/realize_report").then((result) => {
            //         result = result.json();
            //         result = result.map((obj) => {
            //             const good_item = goods.getItem(obj.good_id);
            //             if (good_item.hasOwnProperty("id")) {
            //                 delete good_item.id;
            //                 Object.assign(obj, good_item);
            //             }
            //             obj.category = goods_categories.getItem(obj.category_id).name;
            //             obj.supplier = suppliers.getItem(obj.supplier_id).name;
            //             obj.date_realize = this.formatDate(obj.date_realize);
            //             return obj;
            //         });
            //         if (!realization_reports_datatable.isVisible()) {
            //             realization_reports_datatable.show();
            //         }
            //         if (registration_reports_datatable.isVisible()) {
            //             registration_reports_datatable.hide();
            //         }
            //         realization_reports_datatable.parse(result);
            //     });
            // }
            // else {
            //     webix.ajax().get("/server/registration_report").then((result) => {
            //         result = result.json();
            //         result = result.map((obj) => {
            //             const good_item = goods.getItem(obj.good_id);
            //             if (good_item.hasOwnProperty("id")) {
            //                 delete good_item.id;
            //                 Object.assign(obj, good_item);
            //             }
            //             users.data.each((user) => {
            //                 if (user.user_id === obj.user_id) {
            //                     obj.user = user;
            //                 }
            //             });
            //             obj.date_registration = this.formatDate(obj.date_registration, true);
            //             return obj;
            //         });
            //         if (!registration_reports_datatable.isVisible()) {
            //             registration_reports_datatable.show();
            //         }
            //         if (realization_reports_datatable.isVisible()) {
            //             realization_reports_datatable.hide();
            //         }
            //         registration_reports_datatable.parse(result);
            //     });
            // }
        });
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