import { JetView } from "webix-jet";
import NewSupplierPopupView from "./addNewSupplierPopup";
import { suppliers } from "../models/suppliers";

export default class SuppliersView extends JetView {
    config() {
        const _ = this.app.getService("locale")._;
        const toolbar = {
            view: "toolbar",
            padding: 20,
            elements: [
                { view: "icon", icon: "mdi mdi-car-pickup", css: "mdi-toolbar-icons", width: 70, height: 40 },
                { view: "label", label: _("Suppliers"), align: "left" },
                {
                    view: "button", label: _("Add new supplier"), width: 250, align: "right", type: "icon", icon: "mdi mdi-account-multiple-plus",
                    click: () => {
                        this.addNewSupplierPopup.show();
                    }
                }
            ],
            css: "main-layout-toolbar"
        };

        const datatable = {
            view: "datatable",
            data: suppliers,
            columns: [
                { id: "id", header: "", width: 50 },
                { id: "supplier_name", header: "Supplier name", fillspace:true },
                { id: "tin", header: "TIN", adjust:true },
                { id: "surname", header: "Surname", adjust:true },
                { id: "name", header: "Name", adjust:true},
                { id: "patronymic", header: "Patronymic", adjust:true },
                { id: "phone", header: "Phone", adjust:true },
                { id: "editInformation", header: "", template: "<i class='mdi mdi-lead-pencil'></i>", width: 40 }
            ],
            onClick: {
                "mdi-lead-pencil": (event, item) => {
                    const supplier = this.getRoot().queryView({ view: "datatable" }).getItem(item.row);
                    this.addNewSupplierPopup.show(supplier);
                }
            }
        };

        return {
            rows: [
                toolbar,
                datatable
            ]
        }
    }

    init() {
        this.addNewSupplierPopup = this.ui(NewSupplierPopupView);
    }
}