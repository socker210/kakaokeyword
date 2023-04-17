/* React Modules */
import React from "react";
import { api } from "api";
import { Grid, Row, Col } from "react-bootstrap";

/* User Components */
import Message from "./Message";
import SearchBar from "./SearchBar";
import ContentsContainer from "./ContentsContainer";
import PageIndicator from "./PageIndicator";


// App Class:
//	  UI Wrapper Class
export default class App extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<Grid>
				<Row>
					<Col md={12} sm={12} xs={12}>
						<Message />
					</Col>
					<Col md={12} sm={12} xs={12}>
						<SearchBar />
					</Col>
					<Col md={12} sm={12} xs={12}>
						<ContentsContainer />
					</Col>
					<Col md={12} sm={12} xs={12}>
						<PageIndicator />
					</Col>
				</Row>
			</Grid>
		);
	}
}