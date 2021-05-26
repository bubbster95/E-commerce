import React from 'react';

import { collectCategories } from '../../categoryContext'

import { collectByTags } from '../../firebase'

import './category-page.css';

import Tile from '../../component/tile/tile';
import HeroImage from '../../component/hero-image/hero-image';

class CategoryPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            object: {}
        }

        // Imports items by category from firebase
        this.loadKeys = async () =>{
            let context = await this.context
            this.setState({
                object: await collectByTags(context[this.props.type]['tags'])
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
                return <Tile
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
                        {this.filterItems()}
                    </div>
                </div>
            )
    }
}

CategoryPage.contextType = collectCategories

export default CategoryPage;