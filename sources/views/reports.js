import { JetView } from "webix-jet";

export default class ReportsView extends JetView {
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

        const datatable = {
            view: "datatable",
            columns: [
                { id: "id", header: "№", width: 50 },
                { id: "name", header: "Product", fillspace: true },
                { id: "articul", header: "Article", adjust: true },
                { id: "count", header: "Count", adjust: true },
                { id: "total_price", header: "Total price", adjust: true },
                { id: "pdfExport", header: "", template: "<i class='mdi mdi-file-pdf'></i>", width: 40 },
                { id: "excelExport", header: "", template: "<i class='mdi mdi-file-excel'></i>", width: 40 },
                { id: "viewInfo", header: "", template: "<i class='mdi mdi-eye'></i>", width: 40 }
            ],
            onClick: {
                "mdi-lead-pencil": (event, item) => {
                    const supplier = this.getRoot().queryView({ view: "datatable" }).getItem(item.row);
                    this.addNewSupplierPopup.show(supplier);
                },
                "mdi-eye": (event, item) => {
                    const supplier = this.getRoot().queryView({ view: "datatable" }).getItem(item.row);
                    this.viewSupplierInformation.show(supplier);
                }
            }
        };

        return {
            rows: [
                toolbar,
                datatable,
                {}
            ]
        }
    }

    init() {
        webix.ajax().get("/server/realize_report").then((result) => {
            // debugger
            const datatable = this.getRoot().queryView({ view: "datatable" });
            datatable.parse(result.json());
        });
        // debugger
    }

}