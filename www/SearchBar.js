/* React Modules */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Glyphicon , Button, FormGroup, FormControl, InputGroup } from "react-bootstrap";

/* User components */
import { execActAsThunkToSearchQuery } from "./modules/Reducer";


// SearchBar Class:
//    Search Bar UI Component
class SearchBar extends React.Component
{
	constructor(props)
	{
		super(props);

		// Initial local state
		this.state = {
			query: ''
		}

		// Initial Props func
		this.execActAsThunkToSearchQuery = () => this.props.execActAsThunkToSearchQuery(this.state.query);
	}

	render()
	{
		return (
			<div>
				<FormGroup controlId="query" 
						   className="extra-frm-inline">
					<InputGroup>
						<FormControl value={this.state.query}
							 	 onChange={this.onChanageQuery.bind(this)}
							 	 onKeyPress={this.onSearchWhenPressEnter.bind(this)} />
						<InputGroup.Button>
							<Button disabled={this.props.action == 'PENDING'}
									onClick={this.execActAsThunkToSearchQuery}
									children="Search" />
						</InputGroup.Button>
					</InputGroup>
				</FormGroup>
			</div>
		);
	}

	//##################################
	//## User Functions			      ##
	//##################################
	// onChanageQuery(event):
	//	  Update text local state
	onChanageQuery(e)
	{
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	// onSearchWhenPressEnter(event)
	//	  Execute Search button onClick event automatically
	onSearchWhenPressEnter(e)
	{
		if (e.charCode == 13 && this.props.action != 'PENDING')
			this.execActAsThunkToSearchQuery();
	}
}


// Default Props & Prop Types
SearchBar.defaultProps = {
	action: 'NOITEM' ,
	execActAsThunkToSearchQuery: () => console.log('Component:[SearchBar] Function:[execActAsThunkToSearchQuery] is not defined')
}

SearchBar.propTypes = {
	action: PropTypes.string ,
	execActAsThunkToSearchQuery: PropTypes.func
}


// Connect to Store
let mapStateToProps = (state) => {
	return {
		action: state.getIn(['state','action'])
	}
}
let mapDispatchToProps = (dispatch) => {
	return {
		execActAsThunkToSearchQuery: (query) => dispatch(execActAsThunkToSearchQuery(query))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);