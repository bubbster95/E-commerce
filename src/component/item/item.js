import React from 'react';

import { getBGImageFromStore } from '../../firebase';

import './item.css';

import {
    Link
  } from "react-router-dom";

class Item extends React.Component {

    getImage = () => {
        getBGImageFromStore(this.props.skew, this.props.image + '_0.jpeg')
    }

    render() {
        return (
            <Link to={this.props.path + '/' + this.props.skew}>
                <div className='item-container' key={this.props.skew} >
                    <div className='image-container'>
                        <div className='product-image' id={this.props.skew} alt={this.props.title} onLoad={this.getImage()}/>
                    </div>
                    <div className='info-container'>
                            <h2>{this.props.title}</h2> 
                            <h3>{this.props.sub}</h3>
                            <p className='price'>{this.props.price}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

export default Item;