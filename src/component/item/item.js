import React from 'react';

import {getImageFromStore} from '../../firebase';

import './item.css';

import {
    Link
  } from "react-router-dom";

class Item extends React.Component {

    getImage = () => {
        getImageFromStore(this.props.skew, this.props.bucket, this.props.image)
    }

    sendSkew = () => {
        this.props.setSkew(this.props.skew)
        this.props.setPath(this.props.path)
    }

    render() {
        return (
            <div className='item-container' key={this.props.skew} >
                <div className='image-container'>
                    <img className='product-image' id={this.props.skew} alt={this.props.title} onLoad={this.getImage()}/>
                </div>
                <div className='info-container'>
                    <Link to={this.props.path + '/' + this.props.skew} onClick={this.sendSkew}>
                        <h2>{this.props.title}</h2>
                    </Link> 
                </div>
            </div>
        )
    }
}

export default Item;