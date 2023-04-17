/* React Modules */
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Pager } from "react-bootstrap";

/* User Components */
import { execActAsThunkToPaging } from './modules/Reducer';


// PageIndicator Class:
//	  Page indicator
class PageIndicator extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div>
				<Pager>
					<Pager.Item previous={true} 
								href="#"
								children="Previous"
								disabled={!this.props.isCanPrev}
								onClick={() => this.props.execActAsThunkToPaging(-1)} />

					<Pager.Item next={true} 
								href="#"
								children="Next"
								disabled={!this.props.isCanNext}
								onClick={() => this.props.execActAsThunkToPaging(1)} />
				</Pager>
			</div>
		);
	}
}


// Default Props & Prop Types
PageIndicator.defaultProps = {
	isCanPrev: false ,
	isCanNext: false ,
	execActAsThunkToPaging: () => console.log("Component:[PageIndicator] Function:[execActAsThunkToPaging] is not defined")
}

PageIndicator.propTypes = {
	isCanPrev: PropTypes.bool ,
	isCanNext: PropTypes.bool ,
	execActAsThunkToPaging: PropTypes.func
}


// Connect to Store
let mapStateToProps = (state) => {
	return {
		isCanPrev: state.getIn(['search','isCanPrev']) ,
		isCanNext: state.getIn(['search','isCanNext'])
	}
}

let mapDispatchToPros = (dispatch) => {
	return {
		execActAsThunkToPaging: (number) => dispatch(execActAsThunkToPaging(number))
	}
}

export default connect(mapStateToProps,mapDispatchToPros)(PageIndicator);