import { JetView, plugins } from "webix-jet";


export default class GoodsView extends JetView {
    config() {
        const _ = this.app.getService("locale")._;
        const sidebar = {
            view: "sidebar",
            localId: "sidebar",
            width: 300,
            data: [
                { id: "goodsCategoriesTree", value: _("Good's categories"), icon: "mdi mdi-arrow-right-thick" },
                { id: "productsByCategories", value: _("Products by categories"), icon: "mdi mdi-arrow-right-thick" },
                { id: "productsPlacement", value: _("Product's placement"), icon: "mdi mdi-arrow-right-thick" }
            ]
        };

        return {
            cols: [
                sidebar,
                { $subview: true }
            ]
        };
    }

    init() {
        this.use(plugins.Menu, "sidebar");
    }
}