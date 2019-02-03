import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Product from './Product.js';


class ProductList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            products: '',
            loading: true
        }
    }

    // makes the api call
    callApi() {
        let urlParams = new URLSearchParams(window.location.search)
        urlParams = urlParams.get('search')

        axios
            .get('http://localhost:3001/api/items?search=' + urlParams)
            .then((result) => {
                this.setState({
                    products: result.data,
                    loading: false
                })
            })
    }

    // updates the component
    componentDidUpdate() {
        this.callApi();
    }
    // mounts the component
    componentDidMount() {
        this.callApi();
    }

    render() {
        // while the api makes the call, show a loading animation
        if(this.state.loading) {
            return (
                <div className='loading-cont'>
                    <ReactLoading type='bubbles' color='#bc3b6a'/>
                </div>
            ) 
        }

        // for each element in the api response, returns a Product component
        const products = this.state.products.items.map(function(product) {
            return (
                <Product products={product}></Product>
            )
        })

        return (
            // appends {products} to the dom 
            <div className='product-list'>
                <p>{this.state.products.categories.name}</p>
                <div className='list-cont'>
                    {products}
                </div>
            </div>
        )
    }
}

export default ProductList;