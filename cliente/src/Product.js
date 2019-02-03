import React, { Component } from 'react';
import shipIcon from './assets/envio.png';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

class Product extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const p = this.props.products;
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
    }
}

export default Product;