import React from 'react';

import {getImageFromStore} from '../../firebase';

import './item.css';

import {
    Switch,
    Route,
    Link
  } from "react-router-dom";

import ItemPage from '../../page/item-page/item-page'




class Item extends React.Component {
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
        console.log(this.state.skew, this.state.image, this.state.bucket)
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
                </div>
                <Link to={'/shop/' + this.state.skew}>Item Link</Link>
                <Switch>
                    <Route exact path={'/shop/' + this.state.skew}>
                        <ItemPage
                            skew={this.state.skew}
                            title={this.state.title}
                            type={this.state.type}
                            description={this.state.description}
                            price={this.state.price}
                            image={this.state.image}
                            bucket={this.state.bucket}
                        />
                    </Route> 
                </Switch>
            </div>
        )
    }
}

export default Item;