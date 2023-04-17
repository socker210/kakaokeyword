/* React Modules */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Glyphicon } from "react-bootstrap";

/* User Components */
import * as actions from "./modules/Reducer";
import { cvtToPos, cvtToURL } from "api";


// Contents Class:
//	  Show API data by UI
class Contents extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	// If component did mount then it will request image to daum server
	componentDidMount()
	{
		let params = {
			x: this.props.x,
			y: this.props.y
		}

		cvtToPos(params)
		.then((response) => {
			// Append image to image container
			var image = document.createElement("div");
			var url = cvtToURL(response.data.documents[0].x,response.data.documents[0].y);

			image.className = 'contents-item-image';
			image.style.cursor = "pointer";
			image.style.backgroundImage = "url("+url+")";
			image.onclick = () => window.open(this.props.place_url);
				
			this.image_container.appendChild(image);
		})
		.catch((error) => {
			// Update state by Error
			this.props.onActSearchFailure(error.response);
		});
	}

	render()
	{
		return (
			<div className="contents-item-container">
				<h4 className="contents-item-header">{this.props.place_name}</h4>
				<small>{this.props.road_address_name || this.props.address_name || 'No address'}</small>
				<div className="contents-item-image-container" ref={(ref) => this.image_container = ref}></div>
				<Glyphicon glyph="phone-alt" />
				<small className="contents-item-phone">{this.props.phone || 'No phone'}</small>
			</div>
		);
	}
}


// Default Props & Prop Types
Contents.defaultProps = {
	onActSearchFailure: () => console.log("Component:[Contents] Function:[onActSearchFailure] is not defined")
}

Contents.propTypes = {
	onActSearchFailure: PropTypes.func
}


// Connect to Store
let mapDispatchToProps = (dispatch) => {
	return {
		onActSearchFailure: (error) => dispatch(actions.SEARCH_FAILURE(error))
	}
}

export default connect(undefined,mapDispatchToProps)(Contents);