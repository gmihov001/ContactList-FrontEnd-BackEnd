const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token"),
			agenda: [],
			apiURI: "https://3001-sapphire-pelican-3nf316mn.ws-us18.gitpod.io/api"
		},
		actions: {
			getContacts: () => {
				fetch(getStore().apiURI + "/contacts")
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
							setStore({ token: respBody.token });
							localStorage.setItem("token", respBody.token);
						}
						if (respBody && respBody.msg) alert(respBody.msg);
					})
					.catch(err => console.log(err));
			},

			logout: () => {
				setStore({ token: null });
				localStorage.removeItem("token");
			},

			addContact: (name, address, phone, email) => {
				fetch(getStore().apiURI + "/contacts", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						email: email,
						phone: phone,
						address: address
					})
				})
					.then(response => {
						console.log(response);
						// if (!response.ok) throw new Error(response.status);
						return response.json();
					})
					.then(respBody => {
						if (respBody.status != 200) throw new Error(respBody.msg);
						if (respBody.status == 200) console.log(respBody.msg);

						fetch(getStore().apiURI + "/contacts")
							.then(response => response.json())
							.then(data => setStore({ agenda: data }))
							.catch(err => console.log(err));
					})
					.catch(err => alert(err));
			},
			editContact: (name, address, phone, email, id) => {
				let store = getStore();
				fetch(getStore().apiURI + "/contacts", {
					method: "put",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: id,
						full_name: name,
						email: email,
						phone: phone,
						address: address
					})
				})
					.then(response => response.json())
					.then(() => {
						fetch(getStore().apiURI + "/contacts")
							.then(response => response.json())
							.then(data => {
								console.log(data);
								setStore({ agenda: data });
							})
							.catch(err => alert(err));
					});
			},
			deleteContact: id => {
				fetch(getStore().apiURI + "/contacts/" + id, {
					method: "delete",
					headers: { "Content-Type": "aplication/json" }
				}).then(() => {
					fetch(getStore().apiURI + "/contacts")
						.then(response => response.json())
						.then(data => {
							setStore({ agenda: data });
						})
						.catch(err => alert(err));
				});
			}

			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
