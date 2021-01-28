import React from 'react';

import {getBGImageFromStore} from '../../firebase';

import './item-type.css';

import {
    Link
  } from "react-router-dom";

class ItemType extends React.Component {
    getImage = () => {
        console.log(this.props.skew, this.props.image, this.props.bucket)
        getBGImageFromStore(this.props.skew, this.props.bucket, this.props.image)
    }

    render() {
        return (
            <Link to={this.props.path}>
                <div className='type-container' key={this.props.skew} >
                    <div className='type-image-container'>
                        <div className='type-image' id={this.props.skew} alt={this.props.title} onLoad={this.getImage()}/>
                    </div>
                    <div className='type-info-container'>
                        <h2 className='title'>{this.props.title}</h2>
                    </div>
                </div>
            </Link> 
        )
    }
}

export default ItemType;