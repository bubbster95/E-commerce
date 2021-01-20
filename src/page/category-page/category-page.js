import React from 'react';

import { productInfo, categories } from '../../firebase'

import './category-page.css';

import Item from '../../component/item/item';

class CategoryPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            category: {},
            object: {}
        }

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

    filterItems = (type) => {
        let skew = []

        let object = this.state.object;
        let keys = Object.keys(object);

        keys.filter(item => {
            let thisItem = object[item]
            let tagsItemHas = thisItem['tags']
            let tagsToLookFor = this.state.category['tags']

            for (let i=0; i < tagsItemHas.length; i++) {
                if (tagsToLookFor.includes(tagsItemHas[i]) && !skew.includes(item)) {
                    console.log('look trhough', tagsToLookFor,'for:', tagsItemHas[i])
                    skew.push(item)
                } else {
                    console.log('This list', tagsToLookFor,'didnt have:', tagsItemHas[i])
                }
            }
            return skew
            
        })
        let list = skew.map(item => {
            let thisItem = object[item]
                return <Item
                    setSkew= {this.props.setSkew}
                    setPath= {this.props.setPath}
                    path={type + '/'}
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
                        {this.filterItems(this.props.type)}
                    </div>
                </div>
            )
    }
}

export default CategoryPage;