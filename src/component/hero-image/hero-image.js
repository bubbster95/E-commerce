import React from 'react';

import './hero-image.css'


class HeroImage extends React.Component {
    componentDidMount() {
        let image = ['/assets/kenneth-hargrave-GjsWjLCIh5I-unsplash.jpeg', '/assets/intricate-explorer-idfytKeoD0s-unsplash.jpeg', '/assets/intricate-explorer-idfytKeoD0s-unsplash.jpeg', '/assets/thomas-galler-IvtbiWEVa-4-unsplash.jpeg', '/assets/ugur-peker-9Wuxjit62QU-unsplash.jpeg', '/assets/ugur-peker-9Wuxjit62QU-unsplash.jpeg']
        let imageDiv = document.getElementById('hero-image')
        imageDiv.style.backgroundImage = `url(${image[this.diceRoll(image)]})`
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