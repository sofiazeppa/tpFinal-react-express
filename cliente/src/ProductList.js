import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import shipIcon from './assets/envio.png';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';


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

        // for each element in the api response, returns a html container
        const products = this.state.products.items.map(function(p) {
            return (
                <Link to={'/items/'+p.id} key={p.id}>
                    <div className='prod-cont'>
                        <div className='prod-img'>
                            <img src={p.picture}/>
                        </div>
                        <div className='prod-info'>
                            <div className='price-title'>
                                <h2>
                                    <span>$ </span> <NumberFormat value={p.price.amount} thousandSeparator={true} displayType={'text'}/>
                                    {p.price.decimals !== '0' && <span className='decimals'>{p.price.decimals}</span>}
                                    {p.free_shipping === true && <span><img src={shipIcon}/></span>}
                                </h2>
                                <p>{p.title}</p>
                            </div>
                            <div className='city'>
                                <p>{p.location}</p>
                            </div>
                        </div>
                    </div>
                </Link>
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