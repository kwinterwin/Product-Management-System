import { JetView } from "webix-jet";
import { goods_categories } from "../models/goods_categories";
let gridlayoutStructure = [];

export default class ProductsPlacementView extends JetView {
	config() {
		const gridlayout = {
			view: "gridlayout",
			gridColumns: 5, gridRows: 5,
			cells: [
				{
					css: "boxy red", template: () => {
						let template = "<p>Блок А1</p><ul>";
						let count = 0, id = 0;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";
						return template;
					}, x: 0, y: 0, dx: 1.6, dy: 1
				},
				{
					css: "boxy red", template: () => {
						let template = "<p>Блок А2</p><ul>";
						let count = 0, id = 1;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";
						return template;
					}, x: 1.65, y: 0, dx: 1.6, dy: 1
				},
				{
					css: "boxy red", template: () => {
						let template = "<p>Блок А3</p><ul>";
						let count = 0, id = 2;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";
						return template;
					}, x: 3.3, y: 0, dx: 1.6, dy: 1
				},
				{
					css: "boxy", template: () => {
						let template = "<p>Новые товары</p><ul>";
						return template;
					}, x: 0, y: 1, dx: 1.6, dy: 1
				},
				{
					css: "boxy", template: () => {
						let template = "<p>Потерянные товары</p><ul>";
						return template;
					}, x: 1.65, y: 1, dx: 1.6, dy: 1
				},
				{
					css: "boxy", template: () => {
						let template = "<p>Блок B3</p><ul>";
						let count = 0, id = 3;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";
						return template;
					}, x: 3.3, y: 1, dx: 1.6, dy: 1
				},
				{
					css: "boxy", template: () => {
						let template = "<p>Блок C1</p><ul>";
						let count = 0, id = 4;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";

						return template;
					}, x: 0, y: 2, dx: 1.6, dy: 1
				},
				{
					css: "boxy", template: () => {
						let template = "<p>Блок C2</p><ul>";
						let count = 0, id = 5;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";

						return template;
					}, x: 1.65, y: 2, dx: 1.6, dy: 1
				},
				{
					css: "boxy", template: () => {
						let template = "<p>Блок C3</p><ul>";
						let count = 0, id = 6;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";

						return template;
					}, x: 3.3, y: 2, dx: 1.6, dy: 1
				},
				{
					css: "boxy", template: () => {
						let template = "<p>Блок D1</p><ul>";
						let count = 0, id = 7;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";

						return template;
					}, x: 0, y: 3, dx: 1.6, dy: 1
				},
				{
					css: "boxy", template: () => {
						let template = "<p>Блок D2</p><ul>";
						let count = 0, id = 8;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";

						return template;
					}, x: 1.65, y: 3, dx: 1.6, dy: 1
				},
				{
					css: "boxy", template: () => {
						let template = "<p>Блок D3</p><ul>";
						let count = 0, id = 9;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";

						return template;
					}, x: 3.3, y: 3, dx: 1.65, dy: 1
				},
				{
					css: "boxy", template: () => {
						let template = "<p>Блок E1</p><ul>";
						let count = 0, id = 10;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";

						return template;
					}, x: 0, y: 4, dx: 1.6, dy: 1
				},
				{
					css: "boxy", template: () => {
						let template = "<p>Блок E2</p><ul>";
						let count = 0, id = 11;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";

						return template;
					}, x: 1.65, y: 4, dx: 1.6, dy: 1
				},
				{
					css: "boxy", template: () => {
						let template = "<p>Блок E3</p><ul>";
						let count = 0, id = 12;
						if (gridlayoutStructure.length) {
							for (let i = id * 3; count < 3; count++) {
								if (gridlayoutStructure[i])
									template += "<li>" + gridlayoutStructure[i].name + "</li>";
								i++;
							}
						}
						template += "</ul>";
						return template;
					}, x: 3.3, y: 4, dx: 1.6, dy: 1
				},
			]
		};

		return {
			rows: [
				gridlayout,
				{ view: "button", value: "Провести инвентаризацию", inputWidth: 300, align: "center" },
				{ height: 10 }
			]
		};
	}

	init() {
		Promise.all([webix.ajax().get("/server/realize_group_report")]).then((result) => {
			if (goods_categories.data.count()) {
				this.parseData(result[0].json());
			} else {
				goods_categories.waitData.then(() => {
					this.parseData(result[0].json());
				});
			}
		});
	}

	parseData(hotCategories, categories = goods_categories.data.pull) {
		let categoriesArray = [];
		for (let key in categories) {
			categoriesArray.push(categories[key]);
		}
		categoriesArray = categoriesArray.map((element) => {
			let category = hotCategories.find((category) => category.category_id === element.id);
			element.count = category ? category.result : 0;
			return element;
		});
		categoriesArray = categoriesArray.sort((a, b) => {
			if (a.count < b.count) {
				return -1;
			}
			if (a.count < b.count) {
				return 1;
			}
			return 0;
		}).reverse();
		gridlayoutStructure = categoriesArray;
		const grid = this.getRoot().queryView({ view: "gridlayout" });
		grid.reconstruct();
	}
}
