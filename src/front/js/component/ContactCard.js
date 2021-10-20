import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import MikePhoto from "../../img/m101.jpg";
import { Context } from "../store/appContext";
import { Modal } from "./Modal.js";
import { Link } from "react-router-dom";

export class ContactCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// initialize your state
		};
	}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					return (
						<li className="list-group-item p-4">
							<div className="row w-100">
								<div className="col-6 col-sm-6 col-md-3 px-0">
									<img
										src={MikePhoto}
										alt="Photo"
										className="rounded-circle mx-auto d-block img-fluid"
									/>
								</div>

								<div className="col-12 col-sm-6 col-md-6 text-start ml-5">
									<label className="name-lead mb-2">
										<h5>{this.props.name}</h5>
									</label>
									<br />
									<i className="fas fa-map-marker-alt text-muted mr-3" />
									<span className="text-muted ml-3">{this.props.address}</span>
									<br />
									<i
										className="fa fa-phone fa-fw text-muted mr-3"
										data-toggle="tooltip"
										title=""
										data-original-title="(870) 288-4149"
									/>
									<span className="text-muted small">{this.props.phone}</span>
									<br />
									<i
										className="fa fa-envelope fa-fw text-muted mr-3"
										data-toggle="tooltip"
										data-original-title=""
										title=""
									/>
									<span className="text-muted small text-truncate">{this.props.email}</span>
								</div>

								<div className="col-6 col-sm-3 col-md-3 text-end">
									<div className="">
										<Link to={"/edit/" + this.props.id + "/" + this.props.name}>
											<button className="btn">
												<i className="fas fa-pencil-alt mr-3" />
											</button>
										</Link>
										<button
											className="btn"
											onClick={() => {
												this.props.onDelete();
											}}>
											<i className="fas fa-trash-alt" />
										</button>
									</div>
								</div>
							</div>
						</li>
					);
				}}
			</Context.Consumer>
		);
	}
}

/**
 * Define the data-types for
 * your component's properties
 **/
ContactCard.propTypes = {
	history: PropTypes.object,
	onDelete: PropTypes.func,
	name: PropTypes.string,
	address: PropTypes.string,
	phone: PropTypes.string,
	email: PropTypes.string,
	id: PropTypes.string,
	position: PropTypes.number
};

/**
 * Define the default values for
 * your component's properties
 **/
ContactCard.defaultProps = {
	onDelete: null
};

// import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import MikePhoto from "../../img/m101.jpg";

// export const ContactCard = props => {
// 	const [state, setState] = useState({
// 		//initialize state here
// 	});

// 	return (
// 		<li className="list-group-item">
// 			<div className="row w-100">
// 				<div className="col-12 col-sm-6 col-md-3 px-0">
// 					<img src={MikePhoto} alt="Contact Photo" className="rounded-circle mx-auto d-block img-fluid" />
// 				</div>
// 				<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
// 					<div className=" float-right">
// 						<button className="btn">
// 							<i className="fas fa-pencil-alt mr-3" />
// 						</button>
// 						<button className="btn" onClick={() => props.onDelete()}>
// 							<i className="fas fa-trash-alt" />
// 						</button>
// 					</div>
// 					<label className="name lead">{props.name}</label>
// 					<br />
// 					<i className="fas fa-map-marker-alt text-muted mr-3" />
// 					<span className="text-muted">{props.address}</span>
// 					<br />
// 					<span
// 						className="fa fa-phone fa-fw text-muted mr-3"
// 						data-toggle="tooltip"
// 						title=""
// 						data-original-title="(870) 288-4149"
// 					/>
// 					<span className="text-muted small">{props.phone}</span>
// 					<br />
// 					<span
// 						className="fa fa-envelope fa-fw text-muted mr-3"
// 						data-toggle="tooltip"
// 						data-original-title=""
// 						title=""
// 					/>
// 					<span className="text-muted small text-truncate">{props.email}</span>
// 				</div>
// 			</div>
// 		</li>
// 	);
// };

// /**
//  * Define the data-types for
//  * your component's properties
//  **/
// ContactCard.propTypes = {
// 	history: PropTypes.object,
// 	name: PropTypes.string,
// 	address: PropTypes.string,
// 	phone: PropTypes.number,
// 	email: PropTypes.string,
// 	onDelete: PropTypes.func
// };

// /**
//  * Define the default values for
//  * your component's properties
//  **/
// ContactCard.defaultProps = {
// 	onDelete: null
// };
