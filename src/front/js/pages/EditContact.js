import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const EditContact = props => {
	const { store, actions } = useContext(Context);

	var contact = store.agenda.find(item => item.id == props.match.params.id);

	const [updatedContact, setUpdatedContact] = useState({
		name: contact.full_name,
		address: contact.address,
		phone: contact.phone,
		email: contact.email,
		id: contact.id
	});

	const handleChange = e => {
		setUpdatedContact({ ...updatedContact, [e.target.name]: e.target.value });
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							name="name"
							className="form-control"
							value={updatedContact.name}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							name="email"
							className="form-control"
							value={updatedContact.email}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							name="phone"
							className="form-control"
							value={updatedContact.phone}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							name="address"
							className="form-control"
							value={updatedContact.address}
							onChange={handleChange}
						/>
					</div>
					<Link to="/">
						<button
							type="button"
							className="btn btn-warning form-control"
							onClick={() =>
								actions.editContact(
									updatedContact.name,
									updatedContact.address,
									updatedContact.phone,
									updatedContact.email,
									updatedContact.id
								)
							}>
							SAVE
						</button>
					</Link>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

EditContact.propTypes = {
	match: PropTypes.object
};
