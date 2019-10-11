import { JetView, plugins } from "webix-jet";

export default class Start extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const toolbar = {
			view: "toolbar",
			elements: [
				{
					view: "icon", icon: "mdi mdi-menu", click: () => {
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
				{ view: "label", label: _("Product Management System"), align: "left" },
				{ view: "label", label: "", align: "center", localId: "nameLabel" },
				{
					view: "button", label: _("Logout"), width: 100, align: "right", type: "icon", icon: "mdi mdi-logout",
					click: () => {
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
				{ id: "suppliers", value: _("Suppliers"), icon: "mdi mdi-car-pickup" },
				{ id: "", value: _("Goods"), icon: "mdi mdi-briefcase" },
				{ id: "", value: _("Reports"), icon: "mdi mdi-clipboard-text" },
				{ id: "", value: _("Purchase proposals"), icon: "mdi mdi-book" },
				{ id: "users", value: _("Users"), icon: "mdi mdi-account-group" },
				{ id: "settings", value: _("Settings"), icon: "mdi mdi-cogs" }
			]
		};

		const user_sidebar = {
			view: "sidebar",
			hidden: true,
			localId: "userSidebar",
			data: [
				{ id: "", value: _("Compose a new proposal") },
				{ id: "", value: _("Product registration") },
				{ id: "", value: _("Product searching") },
				{ id: "", value: _("Goods releasing") },
				{ id: "", value: _("Reports making") }
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