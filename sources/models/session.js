import { serverURL } from "../../config";

function status() {
	return webix.ajax().post(serverURL + "/server/login/status")
		.then(a => a.json());
}

function login(user, pass) {
	return webix.ajax().post(serverURL + "/server/login", {
		user, pass
	}).then(a => a.json());
}

function logout() {
	return webix.ajax().post(serverURL + "/server/logout")
		.then(a => a.json());
}

export default {
	status, login, logout
};