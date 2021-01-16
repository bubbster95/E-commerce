import React from 'react';

// import {getImageFromStore} from '../../firebase'

class Item extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            skew: this.props.skew,
            title: this.props.title,
            description: this.props.description,
            price: this.props.price,
            tags: 'This is where tags go.'
        }
    }

    // getImage = () => {
    //     getImageFromStore('myimg', 'gs://e-commerce-697c4.appspot.com', 'LayoutResume.jpg')
    // }

    render() {
        return (
            <div className='item-container' key={this.state.skew} >
                <div className='image-container'>
                    <img id={this.state.skew} alt={this.state.title}/>
                </div>
                <div className='info-container'>
                    <h2>{this.state.title}</h2>
                    <span>{this.state.description}</span>
                    <span>{this.state.price}</span>
                    <span>{this.state.tags}</span>
                </div>
            </div>
        )
    }
}

export default Item;