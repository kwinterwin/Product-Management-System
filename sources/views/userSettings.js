import { JetView } from "webix-jet";
import UserPopupView from "./addNewUserPopup";

export default class UserSettingsView extends JetView {

    config() {
        const _ = this.app.getService("locale")._;
        const lang = this.app.getService("locale").getLang();

        const localization = {
            name: "lang", optionWidth: 120, view: "segmented", label: _("Language"), options: [
                { id: "en", value: "English" },
                { id: "ru", value: "Russian" }
            ], click: () => this.toggleLanguage(), value: lang
        };

        return {
            rows: [
                localization,
                { height: 20 },
                {
                    view: "button", value: _("Edit personal information"), inputWidth: 400,
                    click: () => {
                        const user = this.app.getService("user").getUser();
                        this.userPopup.show(user);
                    }
                },
                {}
            ],
            padding: 40
        };

    }

    toggleLanguage() {
        const langs = this.app.getService("locale");
        const value = this.getRoot().queryView({ name: "lang" }).getValue();
        langs.setLang(value);
    }

    init() {
        this.userPopup = this.ui(UserPopupView);
        const user = this.app.getService("user").getUser();
        if (user.firstly) {
            webix.alert({
                title: "Attention",
                ok: "OK",
                text: "To continue working with the application, please fill out the form with personal data."
            }).then(() => {
                this.userPopup.show(user, user.firstly);
            });
        }
    }
}