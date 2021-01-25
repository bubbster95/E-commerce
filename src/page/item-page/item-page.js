import React from 'react';
import {getImageFromStore, productInfo} from '../../firebase';

import './item-page.css'

import QtyCounter from '../../component/qty-counter/qty-counter'

class ItemPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            object: {}
        }

        this.getInfo = async () =>{
            let productObject = await productInfo(this.props.skew)
            this.setState({
                object: productObject
            })

            this.getImage()
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    getImage = () => {
        getImageFromStore(
            this.props.skew,
            this.state.object['url']['bucket'],
            this.state.object['url']['image']
        )
    }

    addToCart = () => {
        let quantity = parseInt(document.getElementsByClassName('item-quantity')[0].innerHTML);
        console.log(quantity, 'quan')
        if (isNaN(quantity)) {
            quantity = 1
        }
        localStorage.setItem(this.props.skew, quantity)
        this.props.updateCount()
    }

    clearCart = () => {
        localStorage.clear();
    }

    render() {
        return (
            <div className='page'>
                <div className='item-page-container' key={this.props.skew} >
                    <div className='image-page-container'>
                        <img className='product-page-image' id={this.props.skew} alt={this.state.object['title']}/>
                    </div>
                    <div className='info-page-container'>
                        <h2 className='item-title'>{this.state.object['title']}</h2>
                        <p className='item-price'>${this.state.object['price']}</p>
                        <QtyCounter skew={this.props.skew} />
                        <button className='add-to-cart' onClick={this.addToCart}>Add To Cart</button>
                        <button className='clear-cart' onClick={this.clearCart}>Clear Cart</button>

                        <p className='item-description'>{this.state.object['description']}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemPage;