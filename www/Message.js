/* React Modules */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Collapse, Glyphicon } from "react-bootstrap";

/* User Compoennts */
import * as actions from "./modules/Reducer";


// Message Class:
//	  Notification Component
class Message extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
				<div>
					<Collapse in={this.props.is_open}>
						<div>
							<div className="message-container">
								<div className="message-container-close-container">
									<Glyphicon glyph="remove" 
											   className="message-container-close" 
											   onClick={() => this.props.onActMessageClose()} />
								</div>
								<div>
									<p className="message-container-message">{this.props.msg}</p>
								</div>
							</div>
						</div>
					</Collapse>
				</div>
		);
	}
}


// Default Props & Prop Types
Message.defaultProps = {
	msg: '' ,
	is_open: false ,
	onActMessageClose: () => console.log("Component:[Message] Function:[onActMessageClose] is not defined")
}

Message.propTypes = {
	msg: PropTypes.string ,
	is_open: PropTypes.bool ,
	onActMessageClose: PropTypes.func
}


// Connect to Store
let mapStateToProps = (state) => {
	return {
		msg: state.getIn(['notification','msg']) ,
		is_open: state.getIn(['notification','is_open'])
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		onActMessageClose: () => dispatch(actions.MESSAGE_CLOSE())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Message);