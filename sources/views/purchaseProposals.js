import { JetView } from "webix-jet";
import { goods_categories } from "../models/goods_categories";
import { suppliers } from "../models/suppliers";
import { proposals } from "../models/proposals";

export default class PurchaseProposalsView extends JetView {
    config() {
        const _ = this.app.getService("locale")._;
        const dataview = {
            view: "dataview",
            select: false,
            css: "users",
            type: {
                width: 400,
                height: 220,
                template: (obj) => {
                    if (obj.status === "unreviewed")
                        return `
                        <div class='overall proposals'>
                           <div>
                                <p>Name: ${obj.name}</p>
                                <p>Supplier: ${suppliers.getItem(obj.supplier_id).supplier_name}</p>
                                <p>Category: ${goods_categories.getItem(obj.category_id).name}</p>
                                <p>Count: ${obj.count}</p>
                                <p>Date of proposal's registration: ${this.formatDate(new Date(Date.parse(obj.date_registration)))}</p>
                           </div>
                           <div class="proposal-button-section">
                                <section><i class="mdi mdi-close" title="Rejected proposal"></i></section>
                                <section><i class="mdi mdi-check" title="Accepted proposal"></i></section>
                           </div>
                        </div>`;
                    else if (obj.status === "accepted")
                        return `
                        <div class='overall proposals accepted'>
                           <div>
                                <p>Name: ${obj.name}</p>
                                <p>Supplier: ${suppliers.getItem(obj.supplier_id).supplier_name}</p>
                                <p>Category: ${goods_categories.getItem(obj.category_id).name}</p>
                                <p>Count: ${obj.count}</p>
                                <p>Date of proposal's registration: ${this.formatDate(new Date(Date.parse(obj.date_registration)))}</p>
                                <p>Accepted date: ${this.formatDate(new Date(Date.parse(obj.date_approve)))}</p>
                           </div>
                           <div class="proposal-button-section">
                                <section><i class="mdi mdi-autorenew" title="Send to unreviewed proposals"></i></section>
                           </div>
                        </div>`;
                    else if (obj.status === "rejected")
                        return `
                        <div class='overall proposals rejected'>
                           <div>
                                <p>Name: ${obj.name}</p>
                                <p>Supplier: ${suppliers.getItem(obj.supplier_id).supplier_name}</p>
                                <p>Category: ${goods_categories.getItem(obj.category_id).name}</p>
                                <p>Count: ${obj.count}</p>
                                <p>Date of proposal's registration: ${this.formatDate(new Date(Date.parse(obj.date_registration)))}</p>
                           </div>
                           <div class="proposal-button-section">
                                <section><i class="mdi mdi-autorenew" title="Send to unreviewed proposals"></i></section>
                           </div>
                        </div>`;
                }
            },
            data: proposals,
            onClick: {
                "mdi-close": (event, id) => {
                    this.changeItemStatus("rejected", id);
                },
                "mdi-check": (event, id) => {
                    this.changeItemStatus("accepted", id);
                },
                "mdi-autorenew": (event, id) => {
                    this.changeItemStatus("unreviewed", id);
                }
            },
            on: {
                onSelectChange: () => {
                    const tabbar = this.getRoot().queryView({ view: "tabbar" });
                    const dataview = this.getRoot().queryView({ view: "dataview" });
                    dataview.filter((obj) => {
                        return obj.status.toString().indexOf(tabbar.getValue()) != -1;
                    });
                }
            }
        };

        const tabbar = {
            view: "tabbar",
            value: "accepted",
            options: [
                { "id": "unreviewed", "value": _("Unreviewed") },
                { "id": "accepted", "value": _("Accepted") },
                { "id": "rejected", "value": _("Reject") }
            ],
            on: {
                onChange: (id) => {
                    const dataview = this.getRoot().queryView({ view: "dataview" });
                    dataview.filter((obj) => {
                        return obj.status.toString().indexOf(id) != -1;
                    });
                }
            }
        };

        const toolbar = {
            view: "toolbar",
            padding: 20,
            elements: [
                { view: "icon", icon: "mdi mdi-book", css: "mdi-toolbar-icons", width: 70, height: 40 },
                { view: "label", label: _("Purchase proposals"), align: "left" }
            ],
            css: "main-layout-toolbar"
        };

        return {
            rows: [
                toolbar,
                tabbar,
                dataview
            ]
        };
    }

    init() {
        proposals.waitData.then(() => {
            const tabbar = this.getRoot().queryView({ view: "tabbar" });
            tabbar.setValue("unreviewed");
        });
    }

    changeItemStatus(status, id) {
        const dataview = this.getRoot().queryView({ view: "dataview" });
        const item = dataview.getItem(id);
        item.status = status;
        item.date_approve = new Date();
        proposals.updateItem(item.id, item);
        dataview.select(dataview.getFirstId());
        dataview.unselectAll();
    }

    formatDate(date) {
        return date.getUTCFullYear() + "/" + (date.getUTCMonth() + 1) + "/"
            + date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    }
}