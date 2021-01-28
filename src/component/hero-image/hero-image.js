import React from 'react';

import './hero-image.css'

import { getBGImageFromStore } from '../../firebase'

class HeroImage extends React.Component {
    componentDidMount() {
        let image = ['kenneth-hargrave-GjsWjLCIh5I-unsplash.jpg', 'intricate-explorer-idfytKeoD0s-unsplash.jpg', 'thomas-galler-IvtbiWEVa-4-unsplash.jpg', 'ugur-peker-9Wuxjit62QU-unsplash.jpg', 'ugur-peker-9Wuxjit62QU-unsplash.jpg']
        console.log(this.diceRoll(image)) 
        getBGImageFromStore(
            'hero-image',
            'gs://e-commerce-697c4.appspot.com',
            image[ this.diceRoll(image) ]
        )
    }

    diceRoll(image) {
        return Math.floor((Math.random() * image.length))
    }


    render() {
        if (this.props.page) {
            return(
                <div className='hero-container'>
                    <div className='hero-page-title'>{this.props.page}</div>
                    <div className='hero-image' id='hero-image' alt='Beautiful vista of the wilderness.'></div>
                </div>
            )
        } else {
            return(
                <div className='hero-container'>
                    <div className='hero-image' id='hero-image' alt='Beautiful vista of the wilderness.'></div>
                </div>
            )
        }
    }
}

export default HeroImage