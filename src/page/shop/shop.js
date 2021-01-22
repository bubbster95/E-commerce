import React from 'react';

import { categories } from '../../firebase'

import './shop.css';

import ItemType from '../../component/item-type/item-type'

class Shop extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            object: {}
        }

        this.loadKeys = async () =>{
            let categoryObject = await categories()
            this.setState({
                object: categoryObject
            })
        }

    }

    componentDidMount() {
        this.loadKeys()
    }

    filterItems = () => {  
        let object = this.state.object;
        let keys = Object.keys(object);

        let list = keys.map(item => {
            let thisItem = object[item]
            return <ItemType
                path={item}
                key={item}
                skew={item}
                title={thisItem['title']}
                image={thisItem['url']['image']}
                bucket={thisItem['url']['bucket']}
            />
        })
        return <div className='items-list'>{list}</div>
    }

    render() {
        return (
            <div className="page">
                <div className='items-container'>
                    {this.filterItems()}
                </div>
            </div>
        )
    }
}

export default Shop;