import React from 'react';

import { collectionInfo } from '../../firebase'

import './shop.css';

import ItemType from '../../component/category/category'
import HeroImage from '../../component/hero-image/hero-image'

class Shop extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            object: {}
        }

        // loads possible categories and their info
        this.loadKeys = async () =>{
            let categoryObject = await collectionInfo('categories')
            this.setState({
                object: categoryObject
            })
        }

    }

    componentDidMount() {
        this.loadKeys()
    }

    // renders a link to each category page

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
            />
        })
        return <div className='items-list'>{list}</div>
    }

    render() {
        return (
            <div className="page">
                <HeroImage page='Shop'/>
                <div className='items-container'>
                    {this.filterItems()}
                </div>
            </div>
        )
    }
}

export default Shop;