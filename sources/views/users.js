import { JetView } from "webix-jet";
import UserPopupView from "./addNewUserPopup";
import { users } from "../models/users";
import { defaultImage } from "../../config";

export default class UsersView extends JetView {

    constructor(app, name) {
        super(app, name);
        this.defaultImg = defaultImage;
    }

    config() {
        const _ = this.app.getService("locale")._;
        const toolbar = {
            view: "toolbar",
            padding: 20,
            elements: [
                { view: "icon", icon: "mdi mdi-account-group", css: "mdi-toolbar-icons", width: 70, height: 40 },
                { view: "label", label: _("Users"), align: "left" },
                {
                    view: "button", label: _("Add new user"), width: 250, align: "right", type: "icon", icon: "mdi mdi-account-multiple-plus",
                    click: () => {
                        this.addNewUserPopup.show();
                    }
                }
            ],
            css: "main-layout-toolbar"
        };

        const dataview = {
            view: "dataview",
            select: false,
            css: "users",
            type: {
                width: 400,
                height: 160,
                template: (obj) => {
                    return `
                        <div class='overall'>
                            <span class='mdi mdi-lead-pencil' title="Edit user information"></span>
                            <span class='mdi mdi-delete' title="Delete user"></span>
                            <div class="avatar">
                                <img src="${obj.photo ? obj.photo : this.defaultImg}">
                            </div>
                            <div class="user_information">
                                <div class='snp'>${obj.surname} ${obj.name} ${obj.patronymic}</div>
                                <div class=''>${obj.position}</div>
                                <div>${this.formatedDate(obj.date_of_birth)}</div>
                                <div class="phone"><span>Phone:</span> ${obj.phone}</div> 
                            </div>
                        </div>`;
                }
            },
            data: users,
            onClick: {
                "mdi-lead-pencil": (event, id) => {
                    const dataview = this.getRoot().queryView({ view: "dataview" });
                    this.addNewUserPopup.show(dataview.getItem(id));
                }
            }
        };

        return {
            rows: [
                toolbar,
                dataview
            ]
        };
    }

    formatedDate(date) {
        const noFormatDate = new Date(Date.parse(date));
        return `${noFormatDate.getDate()}-${noFormatDate.getMonth() + 1}-${noFormatDate.getFullYear()}`;
    }

    init() {
        this.addNewUserPopup = this.ui(UserPopupView);
    }
}