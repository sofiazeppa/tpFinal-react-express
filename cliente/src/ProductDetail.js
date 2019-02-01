import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import NumberFormat from 'react-number-format';
import './App.scss';


class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: '',
            loading: true
        }
    }

    // mounts the component, makes the api call
    componentDidMount() {
        const id = this.props.match.params.id

        axios
            .get('http://localhost:3001/api/items/' + id)
            .then((result) => {
                this.setState({
                    product: result.data,
                    loading: false
                })
            })
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

        // returns a list of elements recieved by the api
        const breadCrumb = this.state.product.categories.map(function(b, i) {
            return <li key={i}>{b}</li>
        })        

        // returns a html container containing elements recieved by the api
        const detail = this.state.product.item
        return (
            <div className='product-detail' key={detail.id}>
                <ul className='bread-crumb'>
                    {breadCrumb}
                </ul>
                <div className='detail-cont'>
                    <div className='main-detail'>
                        <div className='detail-img'>
                            <img src={detail.picture}/>
                        </div>
                        <div className='desc-detail'>
                            <h3>Descripción del producto</h3>
                            <p>{detail.description}</p>
                        </div>
                    </div>
                    <div className='detail-info'>
                        <p>{detail.condition === 'new' ? 'Nuevo' : 'Usado'} - {detail.sold_quantity} vendidos</p>
                        <h3>{detail.title}</h3>
                        <h1><span>$ </span><NumberFormat value={detail.price.amount} thousandSeparator={true} displayType={'text'}/><span className='decimals'>{detail.price.decimals}</span> </h1>
                        <button>Comprar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;