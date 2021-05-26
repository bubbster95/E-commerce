import React from 'react';

import { getBGImageFromStore } from '../../firebase';

import './item.css';
import './category.css'

import {
    Link
  } from "react-router-dom";

class Tile extends React.Component {

    getImage = (end) => {
        getBGImageFromStore(this.props.skew, this.props.image + end)
    }

    render() {
        return (this.props.sub) ?
            <Link to={this.props.path + '/' + this.props.skew} key={this.props.skew}>
                <div className='item-container'>
                    <div className='image-container'>
                        <div
                        className='product-image'
                        id={this.props.skew}
                        alt={this.props.title}
                        onLoad={this.getImage('_0.jpeg')}
                        />
                    </div>
                    <div className='info-container' id={'info-' + this.props.skew}>
                        <h2 >{this.props.title}</h2>
                        <h3>{this.props.sub}</h3>
                        <p className='price'>{this.props.price}</p>
                    </div>
                </div>
            </Link>
        :   <Link to={this.props.path} key={this.props.skew}>
                <div className='type-container' >
                    <div className='type-image-container'>
                        <div
                        className='type-image'
                        id={this.props.skew}
                        alt={this.props.title}
                        onLoad={this.getImage('')}
                        />
                    </div>
                    <div className='type-info-container'>
                        <h2 className='title'>{this.props.title}</h2>
                    </div>
                </div>
            </Link> 
    }
}

export default Tile;