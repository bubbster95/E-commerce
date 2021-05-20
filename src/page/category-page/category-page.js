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

        // Imports items by category from firebase
        this.loadKeys = async () =>{
            this.setState({
                object: await collectByTags([this.props.type])
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
                return <Item
                    path={this.props.type}
                    key={item}
                    skew={object[item]['sku']}
                    price={object[item]['price']}
                    sub={object[item]['sub']}
                    title={object[item]['title']}
                    image={object[item]['url']['image']}
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