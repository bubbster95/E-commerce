import React from 'react';

import {getImageFromStore} from '../../firebase';

import './item-type.css';

import {
    Link
  } from "react-router-dom";

class ItemType extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            skew: this.props.skew,
            title: this.props.type,
            image: this.props.image,
            bucket: this.props.bucket
        }
    }

    getImage = () => {
        getImageFromStore(this.state.skew, this.state.bucket, this.state.image)
    }

    sendPath = () => {
        console.log('sending path', this.props)
        this.props.setSkew(this.props.skew)
        this.props.setPath(this.props.path)
    }

    render() {
        return (
            <div className='item-container' key={this.state.skew} >
                <div className='image-container'>
                    <img className='product-image' id={this.state.skew} alt={this.state.title} onLoad={this.getImage()}/>
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