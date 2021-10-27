const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token"),
			user: "",
			agenda: [],
			apiURI: "https://3001-sapphire-pelican-3nf316mn.ws-us18.gitpod.io/api"
		},
		actions: {
			getContacts: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/george_agenda")
					.then(response => response.json())
					.then(data => {
						setStore({ agenda: data });
					})
					.catch(err => console.log(err));
			},

			login: (email, password) => {
				console.log(email, password);
				fetch(getStore().apiURI + "/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
						// add this to any fetch in headers  authorization: "Bearer " + store.token
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
					.then(resp => {
						if (!resp.ok) throw new Error(resp.status);
						else return resp.json();
					})
					.then(respBody => {
						console.log(respBody);
						if (respBody && respBody.token) {
							setStore({ token: respBody.token, user: respBody.user });
							localStorage.setItem("token", respBody.token);
						}
						if (respBody && respBody.msg) alert(respBody.msg);
					})
					.catch(err => console.log(err));
			},

			logout: () => {
				setStore({ token: "", user: "" });
				localStorage.removeItem("token");
			},

			addContact: (name, address, phone, email) => {
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						agenda_slug: "george_agenda",
						full_name: name,
						email: email,
						phone: phone,
						address: address
					})
				})
					.then(response => response.json())
					.then(() => {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/george_agenda")
							.then(response => response.json())
							.then(data => setStore({ agenda: data }));
						console.log("created");
					});
			},
			editContact: (name, address, phone, email, id) => {
				let store = getStore();
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "put",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						agenda_slug: "george_agenda",
						full_name: name,
						email: email,
						phone: phone,
						address: address
					})
				})
					.then(response => response.json())
					.then(() => {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/george_agenda")
							.then(response => response.json())
							.then(data => {
								console.log(data);
								setStore({ agenda: data });
							});
					});
			},
			deleteContact: id => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "delete",
					headers: { "Content-Type": "aplication/json" }
				}).then(() => {
					fetch("https://assets.breatheco.de/apis/fake/contact/agenda/george_agenda")
						.then(response => response.json())
						.then(data => {
							setStore({ agenda: data });
						});
				});
			}

			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
