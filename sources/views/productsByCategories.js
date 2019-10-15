import { JetView, plugins } from "webix-jet";
import { goods_categories } from "../models/goods_categories";

export default class ProductsByCategoriesView extends JetView {
    config() {
        const _ = this.app.getService("locale")._;

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
                    webix.ajax().get("/server/goods/" + id).then((result) => {
                        const datatable = this.getRoot().queryView({ view: "datatable" });
                        const emptyField = this.getRoot().queryView({ emptyField: true });
                        datatable.clearAll();
                        datatable.parse(result.json());
                        datatable.refresh();
                        if (!datatable.isVisible()) {
                            datatable.show();
                            if (emptyField.isVisible()) {
                                emptyField.hide();
                            }
                        }
                    });
                }
            }
        };

        const datatable = {
            view: "datatable",
            hidden: true,
            columns: [
                { id: "name", header: _("Product name"), fillspace: true },
                { id: "manuf_country", header: _("Сountry of production"), adjust:true },
                { id: "price", header: _("Price"), adjust:true },
                { id: "count", header: _("Count"), adjust:true }
                // { id: "editInformation", header: "", template: "<i class='mdi mdi-lead-pencil'></i>", width: 40 }
            ]
        };

        return {
            rows: [
                richselect,
                { emptyField: true },
                datatable
            ],
            padding: 20
        };
    }

    init() {
    }
}