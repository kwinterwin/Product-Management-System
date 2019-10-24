import { JetView } from "webix-jet";

export default class SupplierInformationPopupView extends JetView {
    config() {
        const _ = this.app.getService("locale")._;

        const popupToolbar = {
            view: "toolbar",
            elements: [
                { view: "label", label: _("Supplier's information"), align: "left", headerLabel: true },
                {
                    view: "icon", icon: "mdi mdi-close",
                    click: () => {
                        this.getRoot().hide();
                    }
                }
            ], padding: 10
        };

        const template = {
            view: "template",
            borderless: true,
            template: (obj) => {
                return `
                    <section class="supplierInformation">
                        <h3><i class="mdi mdi-information-outline"></i> General supplier's information</h3>
                        <p>Supplier's name: ${obj.supplier_name}</p>
                        <p>TIN: ${obj.tin}</p>
                        <p>Checkpoint: ${obj.checkpoint}</p>
                        <p>Address: ${obj.address}</p>
                        <h3><i class="mdi mdi-information-outline"></i> Contact supplier's information</h3>
                        <p><i class="mdi mdi-account"></i> ${obj.surname + " " + obj.name + " " + obj.patronymic}</p>
                        <p><i class="mdi mdi-phone-settings"></i> ${obj.phone}</p>
                        <p><i class="mdi mdi-at"></i> ${obj.email || ""}</p>
                        <p><i class="mdi mdi-fax"></i> ${obj.fax || ""}</p>
                    </section>
                `;
            }
        };

        const popup = {
            view: "popup",
            width: 450,
            height: 380,
            modal: true,
            position: "center",
            body: {
                rows: [
                    popupToolbar,
                    { height: 7 },
                    template
                ]
            }
        };

        return popup;
    }

    show(supplier) {
        const template = this.getRoot().queryView({ view: "template" });
        template.parse(supplier);
        this.getRoot().show();
    }
}