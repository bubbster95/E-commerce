import React from 'react';

import {getImageFromStore} from '../../firebase'

class Shop extends React.Component {

    getImage = () => {
        getImageFromStore('LayoutResume.jpg', 'myimg')
    }

    render() {
        return <div className="page">
            shop page
            <img id='myimg' alt=''/>
            <button onClick={this.getImage}>Get Image</button>
        </div>
    }
}

export default Shop;