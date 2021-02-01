import React from 'react';

import { productInfo, categories } from '../../firebase'

import './category-page.css';

import Item from '../../component/item/item';
import HeroImage from '../../component/hero-image/hero-image';

class CategoryPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            category: {},
            object: {}
        }

        // imoports items and categories from firebase
        this.loadKeys = async () =>{
            let productObject = await productInfo()
            let categoryObject = await categories(this.props.type)
            this.setState({
                category: categoryObject,
                object: productObject
            })
        }

    }

    componentDidMount() {
        this.loadKeys()
    }

    // filters shop page via tags in items info object
    filterItems = () => {
        let skew = []

        let object = this.state.object;
        let keys = Object.keys(object);

        keys.filter(item => {
            let thisItem = object[item]
            let tagsItemHas = thisItem['tags']
            let tagsToLookFor = this.state.category['tags']

            for (let i=0; i < tagsItemHas.length; i++) {
                if (tagsToLookFor.includes(tagsItemHas[i]) && !skew.includes(item)) {
                    skew.push(item)
                }
            }
            return skew
            
        })
        let list = skew.map(item => {
            let thisItem = object[item]
                return <Item
                    path={this.props.type}
                    key={item}
                    skew={item}
                    price={thisItem['price']}
                    sub={thisItem['sub']}
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
                    <HeroImage page={this.props.type}/>
                    <div className='items-container'>
                        {this.filterItems(this.props.type)}
                    </div>
                </div>
            )
    }
}

export default CategoryPage;