import React, { Component } from 'react';
import Logo from './assets/logo.png';
import SearchIcon from './assets/search.png';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: ''
        }
    }

    // handles changes on this.state.searchInput
    handleOnChangeInput(e) {
        this.setState({
            searchInput: e.target.value 
        })
    }

    render() {
        return (
            <div className='search-bar'>
                <div className='search-content'>
                    <Link to={'/'}>
                        <img src={Logo}/>
                    </Link>
                    <span>
                        <input value={this.state.searchInput} onChange={(e) => this.handleOnChangeInput(e)} placeholder="Nunca dejes de buscar"/>
                        <Link to={'/items?search=' + this.state.searchInput}>
                            <img className='search-ico' src={SearchIcon}/>
                        </Link>
                    </span>
                </div>
            </div>
        )
    }
}

export default SearchBar;