import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const Contacts = props => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		showModal: false,
		id: null
	});

	return (
		<div className="container">
			<div>
				<p className="text-end my-3">
					<Link className="btn btn-outline-success add-button" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.agenda &&
							store.agenda.map((item, i) => {
								return (
									<ContactCard
										key={i}
										id={item.id}
										name={item.full_name}
										email={item.email}
										phone={item.phone}
										address={item.address}
										onDelete={() => setState({ showModal: true, id: item.id })}
									/>
								);
							})}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} id={state.id} onClose={() => setState({ showModal: false })} />
		</div>
	);
};

Contacts.propTypes = {
	history: PropTypes.object
};
