import React from 'react';

import { Link } from 'react-router-dom'

import './added-to-cart.css'

class AddedToCart extends React.Component {

    render() {
        return(
            <div className='added-to-cart-wrapper'>
                <button className='added-to-cart-close' onClick={this.props.toggle}>X</button>
                <div className='added-to-cart-text-wrapper'>
                    <h4>Thank you for adding:</h4>
                    <h2>{this.props.object['title']}</h2>
                    <h3>{this.props.object['sub']}</h3>
                    <h4>to your cart.</h4>
                </div>
                <div className='added-to-cart-controls'>
                    <Link to='/' className='added-to-cart-control'>Continue Shopping</Link>
                    <Link to='/cart' className='added-to-cart-control'>Go To Cart</Link>
                </div>
            </div>
        )
    }
}

export default AddedToCart