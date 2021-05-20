import React from 'react';

import { collectByTags } from '../../firebase'

import './category-page.css';

import Item from '../../component/item/item';
import HeroImage from '../../component/hero-image/hero-image';

class CategoryPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            object: {}
        }

        // imoports items and categories from firebase
        this.loadKeys = async () =>{
            let productObject = await collectByTags([this.props.type])
            this.setState({
                object: productObject
            })
        }

    }

    componentDidMount() {
        this.loadKeys()
    }

    // filters shop page via tags in items info object
    filterItems = () => {
        let object = this.state.object;

        let list = Object.keys(object).map(item => {
            let thisItem = object[item]
                return <Item
                    path={this.props.type}
                    key={item}
                    skew={thisItem['sku']}
                    price={thisItem['price']}
                    sub={thisItem['sub']}
                    title={thisItem['title']}
                    image={thisItem['url']['image']}
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