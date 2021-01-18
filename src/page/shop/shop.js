import React from 'react';

import { productInfo } from '../../firebase'

import './shop.css';

import Item from '../../component/item/item';

class Shop extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            object: {}
        }

        this.loadKeys = async () =>{
            let productObject = await productInfo()
            this.setState({
                object: productObject
            })
        }
    }

    componentDidMount() {
        this.loadKeys()
    }

    populatePage = () => {
        let object = this.state.object;
        let keys = Object.keys(object);
        let listItmes = keys.map(item => {
            let thisItem = object[item]
            return <Item
                setSkew= {this.props.setSkew}
                key={item}
                skew={item}
                title={thisItem['title']}
                image={thisItem['url']['image']}
                bucket={thisItem['url']['bucket']}
            />
        })
        return <div className='items-list'>{listItmes}</div>
    }

    render() {
        return (
            <div className="page">
                <div className='items-container'>
                    {this.populatePage()}
                </div>
            </div>
        )
    }
}

export default Shop;