import { JetView } from "webix-jet";
import { goods_categories } from "../models/goods_categories";
import { suppliers } from "../models/suppliers";

export default class TableReportPopup extends JetView {
    constructor(app, name) {
        super(app, name);
        this.isRealization = null;
    }
    config() {
        const _ = this.app.getService("locale")._;

        const popupToolbar = {
            view: "toolbar",
            elements: [
                { view: "label", label: _("Information"), align: "left", headerLabel: true },
                {
                    view: "icon", icon: "mdi mdi-close",
                    click: () => {
                        this.hide();
                    }
                }
            ], padding: 10
        };

        const realization_template = {
            view: "template",
            realization_template: true,
            hidden: true,
            css: "pdfTemplate",
            borderless: true,
            template: (obj) => {
                return `
                    <h3 style="text-align:center">${_("Report about product realization")}</h3>
                    <p>${_("Product")}: ${obj.name}:</p>
                    <p>${_("Article")}: ${obj.articul}</p>
                    <p>${_("Brand")}: ${obj.brand}</p>
                    <p>${_("Category")}: ${obj.category}</p>
                    <p>${_("Manufactured country")}: ${obj.manuf_country}</p>
                    <p>${_("Date of realization")}: ${this.formatDate(obj.date_realize, true)}</p>
                    <p>${_("Supplier")}: ${obj.supplier}</p>
                    <p>${_("Barcode")}: ${obj.barcode}</p>
                    <p>${_("Count")}: ${obj.count}</p>
                    <p>${_("Total price")}: ${obj.total_price}</p>
                `;
            }
        };

        const registration_template = {
            view: "template",
            registration_template: true,
            hidden: true,
            css: "pdfTemplate",
            borderless: true,
            template: (obj) => {
                return `
                    <h3 style="text-align:center">${_("Report about product registration")}</h3>
                    <p>${_("Product")}: ${obj.name}:</p>
                    <p>${_("Article")}: ${obj.articul}</p>
                    <p>${_("Brand")}: ${obj.brand}</p>
                    <p>${_("Category")}: ${goods_categories.getItem(obj.category_id).name}</p>
                    <p>${_("Manufactured country")}: ${obj.manuf_country}</p>
                    <p>${_("Supplier")}: ${suppliers.getItem(obj.supplier_id).supplier_name}</p>
                    <p>${_("Barcode")}: ${obj.barcode}</p>
                    <p>${_("Count")}: ${obj.total_count}</p>
					<p>${_("Price")}: ${obj.price}</p>
					<p>${_("Employee")}: ${obj.user.surname + " " + obj.user.name + " " + obj.user.patronymic}</p>
					<p>${_("Date of registration")}: ${obj.date_registration}</p>
                `;
            }
        };

        const popup = {
            view: "popup",
            width: 500,
            height: 550,
            css: "user-added-popup",
            modal: true,
            position: "center",
            body: {
                rows: [
                    popupToolbar,
                    { height: 10 },
                    registration_template,
                    realization_template,
                    {
                        view: "button", value: "Export to PDF", inputWidth: 225, align: "center", click: () => {
                            const realization_template = this.getRoot().queryView({ realization_template: true });
                            const registration_template = this.getRoot().queryView({ registration_template: true });
                            if (this.isRealization) {
                                webix.toPDF(realization_template, { display: "image" });
                            }
                            else {
                                webix.toPDF(registration_template, { display: "image" });
                            }
                        }
                    },
                    { height: 10 }
                ],
                templateView: true
            }
        };

        return popup;
    }

    show(obj, isRealization) {
        this.getRoot().show();
        const realization_template = this.getRoot().queryView({ realization_template: true });
        const registration_template = this.getRoot().queryView({ registration_template: true });
        this.hideAllTemplate();
        this.isRealization = isRealization;
        if (isRealization) {
            realization_template.parse(obj);
            realization_template.show();
        }
        else {
            registration_template.parse(obj);
            registration_template.show();
        }
    }

    hide() {
        this.getRoot().hide();
    }

    hideAllTemplate() {
        const realization_template = this.getRoot().queryView({ realization_template: true });
        const registration_template = this.getRoot().queryView({ registration_template: true });
        if (realization_template.isVisible()) {
            realization_template.hide();
        }
        if (registration_template.isVisible()) {
            registration_template.hide();
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