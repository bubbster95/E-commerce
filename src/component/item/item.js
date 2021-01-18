import React from 'react';

import {getImageFromStore} from '../../firebase';

import './item.css';

import {
    Link
  } from "react-router-dom";

class Item extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            skew: this.props.skew,
            title: this.props.title,
            image: this.props.image,
            bucket: this.props.bucket
        }
    }

    getImage = () => {
        getImageFromStore(this.state.skew, this.state.bucket, this.state.image)
    }

    sendSkew = (skew) => {
        this.props.setSkew(skew)
    }

    render() {
        return (
            <div className='item-container' key={this.state.skew} >
                <div className='image-container'>
                    <img className='product-image' id={this.state.skew} alt={this.state.title} onLoad={this.getImage()}/>
                </div>
                <div className='info-container'>
                    <Link to={'/shop/' + this.state.skew} onClick={() => {this.sendSkew(this.state.skew)}}>
                        <h2>{this.state.title}</h2>
                    </Link> 
                </div>
            </div>
        )
    }
}

export default Item;