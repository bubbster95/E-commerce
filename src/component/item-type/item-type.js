import React from 'react';

import {getImageFromStore} from '../../firebase';

import './item-type.css';

import {
    Link
  } from "react-router-dom";

class ItemType extends React.Component {
    getImage = () => {
        getImageFromStore(this.props.skew, this.props.bucket, this.props.image)
    }

    sendPath = () => {
        console.log('fired click')
        this.props.setPath(this.props.path)
        this.props.setSkew(this.props.skew)
    }

    render() {
        return (
            <div className='item-container' key={this.props.skew} >
                <div className='image-container'>
                    <img className='product-image' id={this.props.skew} alt={this.props.title} onLoad={this.getImage()}/>
                </div>
                <div className='info-container'>
                    <Link
                    to={this.props.path}
                    onClick={() => this.sendPath()}>
                        <h2>{this.props.title}</h2>
                    </Link> 
                </div>
            </div>
        )
    }
}

export default ItemType;