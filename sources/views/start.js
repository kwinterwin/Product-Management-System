import { JetView, plugins } from "webix-jet";

export default class Start extends JetView {
    config() {

        const toolbar = {
            view: "toolbar",
            // paddingX: 40,
            elements: [
                {
                    view: "icon", icon: "bars", click: () => {
                        const sidebarViews = this.getRoot().queryView({ roles: "sidebars" }).getChildViews();
                        let sidebar;
                        sidebarViews.forEach((view) => {
                            if (view.config.hidden === false) {
                                sidebar = view;
                            }
                        });
                        sidebar.toggle();
                    }
                },
                { view: "label", label: "Product Management System", align: "left" },
                { view: "label", label: "", align: "center", localId: "nameLabel" },
                {
                    view: "button", label: "Logout", width: 100, align: "right", type: "icon", click: () => {
                        this.show("/logout");
                    }
                }
            ]
        };

        const admin_sidebar = {
            view: "sidebar",
            localId: "adminSidebar",
            width: 300,
            hidden: true,
            data: [
                { id: "", value: "Suppliers", icon: "drivers-license" },
                { id: "", value: "Goods", icon: "glide-g" },
                { id: "", value: "Reports", icon: "file-text" },
                { id: "", value: "Purchase proposals", icon: "handshake-o" },
                { id: "", value: "Users", icon: "users" },
                { id: "", value: "Settings", icon: "cogs" }
            ]
        };

        const user_sidebar = {
            view: "sidebar",
            hidden: true,
            localId: "userSidebar",
            data: [
                { id: "", value: "Compose a new proposal" },
                { id: "", value: "Product registration" },
                { id: "", value: "Product searching" },
                { id: "", value: "Goods releasing" },
                { id: "", value: "Reports making" }
            ]
        };

        return {
            rows: [
                toolbar,
                {
                    cols: [
                        {
                            rows: [
                                user_sidebar,
                                admin_sidebar,
                                { height: 1 }
                            ],
                            roles: "sidebars"
                        },
                        { $subview: true }
                    ]
                }
            ]
        };

    }

    init() {
        this.use(plugins.Menu, "adminSidebar");
        this.use(plugins.Menu, "userSidebar");
        const user = this.app.getService("user");
        const dataUser = user.getUser();
        if (dataUser.role === "user") {
            this.$$("userSidebar").show();
        }
        else if (dataUser.role === "admin") {
            this.$$("adminSidebar").show();
        }
    }

}