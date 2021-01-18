import React from 'react';
import {getImageFromStore, productInfo} from '../../firebase';

class ItemPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            skew: this.props.skew,
            object: {}
        }

        this.getInfo = async () =>{
            let productObject = await productInfo(this.state.skew)
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
            this.state.skew,
            this.state.object['url']['bucket'],
            this.state.object['url']['image']
        )
    }

    render() {
        return (
            <div className='item-page-container' key={this.state.skew} >
                <div className='image-page-container'>
                    <img className='product-page-image' id={this.state.skew} alt={this.state.object['title']}/>
                </div>
                <div className='info-page-container'>
                    <h2>{this.state.object['title']}</h2>
                    <span>{this.state.object['description']}</span>
                    <span>${this.state.object['price']}</span>
                    <span>{this.state.object['tags']}</span>
                </div>
            </div>
        )
    }
}

export default ItemPage;