import React from 'react';

import { collectCategories } from '../../categoryContext'

import './shop.css';

import ItemType from '../../component/category/category'
import HeroImage from '../../component/hero-image/hero-image'


class Shop extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            object: {}
        }

        this.loadKeys = async () =>{
            this.setState({
                object: await this.context
            })
        }
    }

    componentDidMount() {
        this.loadKeys()
    }

    // renders a link to each category page
    filterItems = () => {  
        let object = this.state.object;

        let list = Object.keys(object).map(item => {
            return <ItemType
                path={item}
                key={item}
                skew={item}
                title={object[item]['title']}
                image={object[item]['url']['image']}
            />
        })
        return <div className='items-list'>{list}</div>
    }

    render() {
        return (
            <div className="page">
                <HeroImage page='Shop'/>
                <div className='items-container'> {this.filterItems()} </div>
            </div>
        )
    }
}

Shop.contextType = collectCategories;

export default Shop;