import { JetView } from "webix-jet";
import {goods_categories} from "../models/goods_categories";

export default class GoodInformationPopupView extends JetView {
    config() {
        const _ = this.app.getService("locale")._;

        const popupToolbar = {
            view: "toolbar",
            elements: [
                { view: "label", label: _("Information about goods"), align: "left", headerLabel: true },
                {
                    view: "icon", icon: "mdi mdi-close",
                    click: () => {
                        this.hide();
                    }
                }
            ], padding: 10
        };

        const layout = {
            view: "template",
            width: 500,
            layoutView: true,
            template: (obj) => {
                if (obj.hasOwnProperty("name"))
                    return `
                    <div>
                        <p><b>${_("Product name")}:</b> ${obj.name}</p>
                        <p><b>Сountry of production:</b> ${obj.manuf_country}</p>
                        <p><b>Article:</b> ${obj.articul}</p>
                        <p><b>Price:</b> ${obj.price} BYN</p>
                        <p><b>Brand:</b> ${obj.brand}</p>
                        <p><b>Category:</b> ${goods_categories.getItem(obj.category_id).name}</p>
                        <p><b>Count:</b> ${obj.count}</p>
                    </div>
                `;
                else return "";
            },
            borderless: true
        };

        const barcode = {
            view: "barcode",
            borderless: true,
            type:"ean13"
        };

        const popup = {
            view: "popup",
            width: 500,
            height: 460,
            modal: true,
            position: "center",
            body: {
                rows: [
                    popupToolbar,
                    { height: 15 },
                    layout,
                    {
                        cols: [
                            barcode, {}, {}
                        ]
                    }
                ]
            }
        };

        return popup;
    }

    show(goodInfo) {
        const barcode = this.getRoot().queryView({ view: "barcode" });
        barcode.setValue(goodInfo.barcode);
        this.getRoot().show();
        const layout = this.getRoot().queryView({ layoutView: true });
        layout.setValues(goodInfo);
    }

    hide() {
        this.getRoot().hide();
    }
}