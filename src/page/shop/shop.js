import React from 'react';

import { productInfo } from '../../firebase'

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

    componentDidUpdate() {
        // this.populatePage()
    }

    populatePage = () => {
        let object = this.state.object;
        let keys = Object.keys(object);
        let listItmes = keys.map(item => {
            let thisItem = this.state.object[item]
            return <Item
                key={item}
                skew={item}
                title={thisItem['title']}
                type={thisItem['type']}
                description={thisItem['description']}
                price={thisItem['pice']}
            />
        })
        return <div>{listItmes}</div>
    }

    render() {
        return (
            <div className="page">
                <div id='items-list'>{this.populatePage()}</div>
            </div>
        )
    }
}

export default Shop;