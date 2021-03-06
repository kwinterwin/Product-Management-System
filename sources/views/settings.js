import { JetView } from "webix-jet";

export default class SettingsView extends JetView {

    config() {
        const _ = this.app.getService("locale")._;
        const lang = this.app.getService("locale").getLang();
        const localization = {
            name: "lang", optionWidth: 120, view: "segmented", label: _("Language"), options: [
                { id: "en", value: "English" },
                { id: "ru", value: _("Russian") }
            ], click: () => this.toggleLanguage(), value: lang
        };

        return {
            rows: [
                localization,
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
}