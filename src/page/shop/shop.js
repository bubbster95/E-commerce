import React from 'react';

import { productInfo } from '../../firebase'

import './shop.css';

import Item from '../../component/item/item';
import ItemType from '../../component/item-type/item-type'

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

    filterItems = (type) => {        
        let bin = []
        let skew = []

        let object = this.state.object;
        let keys = Object.keys(object);

        keys.filter(item => {
            let thisItem = object[item]
            let filter;

            filter = thisItem['type']
            if (type) {
                if (filter === type) {
                    return skew.push(item)
                    && bin.push(filter)
                } else {
                    return null
                }
            } else {
                if (!bin.includes(filter)) {
                    return skew.push(item)
                    && bin.push(filter)
                } else {
                    return null
                }
            }
        })
        let list = skew.map(item => {
            let thisItem = object[item]
            if (type) {
                return <Item
                    setSkew= {this.props.setSkew}
                    path={type + '/' + skew}
                    key={item}
                    skew={item}
                    title={thisItem['title']}
                    image={thisItem['url']['image']}
                    bucket={thisItem['url']['bucket']}
                />
            } else {
                return <ItemType
                    setPath={this.props.setPath}
                    setSkew={this.props.setSkew}
                    path={'/shop/' + thisItem['type']}
                    key={item}
                    skew={thisItem['type']}
                    title={thisItem['type']}
                    image={thisItem['url']['image']}
                    bucket={thisItem['url']['bucket']}
                />
            }
        })
        return <div className='items-list'>{list}</div>
    }

    render() {
        if (this.props.type) {
            return (
                <div className="page">
                    <div className='items-container'>
                        {this.filterItems(this.props.type)}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="page">
                    <div className='items-container'>
                        {this.filterItems()}
                    </div>
                </div>
            )
        }
    }
}

export default Shop;