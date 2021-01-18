import React from 'react';

import {getImageFromStore} from '../../firebase';

class ItemPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            skew: this.props.skew,
            title: this.props.title,
            description: this.props.description,
            price: this.props.price,
            tags: 'This is where tags go.',
            image: this.props.image,
            bucket: this.props.bucket
        }
    }

    getImage = () => {
        getImageFromStore(this.state.skew, this.state.bucket, this.state.image)
    }

    render() {
        return (
            <div className='item-container' key={this.state.skew} >
                <div className='image-container'>
                    <img className='product-image' id={this.state.skew} alt={this.state.title} onLoad={this.getImage()}/>
                </div>
                <div className='info-container'>
                    <h2>{this.state.title}</h2>
                    <span>{this.state.description}</span>
                    <span>${this.state.price}</span>
                    <span>{this.state.tags}</span>
                </div>
            </div>
        )
    }
}

export default ItemPage;