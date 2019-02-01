import React, { Component } from 'react';
import SearchBar from './SearchBar.js';
import ProductList from './ProductList.js';
import ProductDetail from './ProductDetail.js';
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.scss';

class App extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			searchInput: ''
		}
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<SearchBar></SearchBar>
						<Route exact path={'/items/:id'} component={ProductDetail}/>
						<Route exact path={'/items'} component={ProductList}></Route>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
