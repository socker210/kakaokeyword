/* React Modules */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, PageHeader, Glyphicon } from "react-bootstrap";

/* User Components */
import Contents from "./Contents";


// No Item View
const NoItem = (props) => {
	return (
		<div className="contentscontainer-extra-container">
			<span className="contentscontainer-extra-text">
				No Item
			</span>
		</div>
	);
}

// Loading View
const Loading = (props) => {
	return (
		<div className="contentscontainer-extra-container">
			<span className="contentscontainer-extra-text">
				<Glyphicon glyph="repeat"/>
			</span>
		</div>
	);
}


// ContentsContainer Class:
//	  Contents Container Component
class ContentsContainer extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div>
				<PageHeader>
					Your&nbsp;Keyword&nbsp;is&nbsp;&nbsp;
					<small>
						{this.props.query || 'none'}
					</small>
				</PageHeader>
				<div className="contentscontainer-container">
					{
						this.props.action == 'NOITEM'?
						<NoItem /> : this.props.action == 'PENDING'?
						<Loading /> :
						this.props.contents.map((item,i) => {
							return (
								<Col className="col-center" md={4} sm={6} xs={12} key={i}>
									<Contents {...item} />
								</Col>
							);
						})
					}
				</div>
				<hr />
			</div>
		);
	}
}


// Default Props & Prop Types
ContentsContainer.defaultProps = {
	query: '' ,
	action: 'NOITEM' ,
	contents: []
}

ContentsContainer.propTypes = {
	query: PropTypes.string ,
	action: PropTypes.string ,
	contents: PropTypes.array
}


// Connect to Store
let mapStateToProps = (state) => {
	return {
		query: state.getIn(['search','query']) ,
		action: state.getIn(['state','action']) ,
		contents: state.getIn(['data','contents'])
	}
}

export default connect(mapStateToProps,undefined)(ContentsContainer);