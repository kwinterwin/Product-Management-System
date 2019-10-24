import { JetView } from "webix-jet";
import { goods_categories } from "../models/goods_categories";

export default class GoodsCategoriesTreeView extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this.selectTreeItemId = null;
	}

	config() {
		const _ = this.app.getService("locale")._;
		const tree = {
			view: "tree",
			id: "myTree",
			select: true,
			template: (obj, common, value, config) => {
				if (obj.id === "root") {
					return common.icon(obj, common, value, config) + common.folder(obj, common, value, config) + "<b>" + obj.name + "</b>";
				}
				return common.icon(obj, common, value, config) + common.folder(obj, common, value, config) + obj.name;
			},
			on: {
				onBeforeContextMenu: (id) => {
					const tree = this.getRoot().queryView({ view: "tree" }), value = tree.getItem(id);
					tree.select(id);
					const context = webix.$$("contextmenu-mine");

					if (value.$parent === 0) {
						if (context.isItemEnabled("Delete")) {
							context.disableItem("Delete");
						}
					}
					else {
						if (!context.isItemEnabled("Delete")) {
							context.enableItem("Delete");
						}
					}
					if (value.$level > 2) {
						if (context.isItemEnabled("Add")) {
							context.disableItem("Add");
						}
					}
					else {
						if (!context.isItemEnabled("Add")) {
							context.enableItem("Add");
						}
					}
					this.selectTreeItemId = id;
				},
				onItemDblClick: (id) => {
					this.getRoot().queryView({ view: "tree" }).open(id);
				}
			}
		};

		const addedForm = {
			view: "form",
			elements: [
				{ view: "richselect", labelWidth: 150, label: _("Parent category"), options: { body: { data: goods_categories, template: "#name#" } }, disabled: true, name: "parent" },
				{ view: "text", label: _("Category's name"), labelWidth: 150, required: true, name: "name" },
				{
					view: "button", value: _("Save"), inputWidth: 200, align: "right", click: () => {
						const layout = this.getRoot().queryView({ addedCategoryLayout: true });
						layout.hide();
						const form = this.getRoot().queryView({ view: "form" });
						if (form.validate()) {
							const values = form.getValues();
							const tree = this.getRoot().queryView({ view: "tree" });
							const parentValue = tree.getItem(values.parent);
							tree.data.add(values, parentValue.$count, values.parent);
							if (values.parent === "root") {
								values.parent = null;
							}
							goods_categories.add(values);
						}
					}
				}
			]
		};

		const addedCategoryToolbar = {
			view: "toolbar",
			elements: [
				{ view: "label", label: _("Add new category"), align: "left", headerLabel: true }
			], padding: 10
		};

		const addedCategoryLayout = {
			rows: [
				addedCategoryToolbar,
				addedForm
			],
			hidden: true,
			addedCategoryLayout: true
		};

		return {
			rows: [
				tree,
				addedCategoryLayout
			]
		};
	}

	init() {
		const treeData = [{ id: "root", name: "Категории товаров", data: [], value: "Категории товаров" }];
		const map = new Map();
		goods_categories.waitData.then(() => {
			goods_categories.data.each((category) => {
				category.value = category.name;
				if (!category.parent) {
					category.data = [];
					map.set(category.id, category);
				}
				else {
					const parentValue = map.get(category.parent);
					parentValue.data.push(category);
				}
			});
			for (let key of map.keys()) {
				const value = map.get(key);
				treeData[0].data.push(value);
			}
			this.getRoot().queryView({ view: "tree" }).parse(treeData);
		});
	}

	ready() {
		const tree = this.getRoot().queryView({ view: "tree" });
		this.ui({
			view: "contextmenu",
			id: "contextmenu-mine",
			data: ["Add", { $template: "Separator" }, "Delete"],
			on: {
				onItemClick: (id) => {
					const value = webix.$$("contextmenu-mine").getItem(id).value;
					if (value === "Add") {
						const layout = this.getRoot().queryView({ addedCategoryLayout: true });
						const form = this.getRoot().queryView({ view: "form" });
						form.clear();
						if (!layout.isVisible()) {
							layout.show();
							this.getRoot().queryView({ view: "richselect" }).setValue(this.selectTreeItemId);
						}
						else {
							this.getRoot().queryView({ view: "richselect" }).setValue(this.selectTreeItemId);
						}
					}
					else if (value === "Delete") {
						goods_categories.remove(this.selectTreeItemId);
						this.getRoot().queryView({ view: "tree" }).remove(this.selectTreeItemId);
					}
				}
			}
		}).attachTo(tree);
	}
}