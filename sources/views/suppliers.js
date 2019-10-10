import { JetView } from "webix-jet";
import NewSupplierPopupView from "./addNewSupplierPopup";

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
            columns: [
                { id: "rank", header: "", width: 50 },
                { id: "title", header: "Film title", width: 200 },
                { id: "year", header: "Released", width: 80 },
                { id: "votes", header: "Votes", width: 100 }
            ],
            data: [
                { id: 1, title: "The Shawshank Redemption", year: 1994, votes: 678790, rank: 1 },
                { id: 2, title: "The Godfather", year: 1972, votes: 511495, rank: 2 }
            ]
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