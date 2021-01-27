import React from 'react';

import './item-image.css'

import {getImageFromStore, productInfo} from '../../firebase';

class ItemImage extends React.Component {
constructor(props) {
    super(props)

    this.state = {
        object: {}
    }

    this.getInfo = async () =>{
        let productObject = await productInfo(this.props.skew)
        this.setState({
            object: productObject
        })

        this.renderImages()
    }

}

    componentDidMount() { this.getInfo() }

    getImage = (skew, filePath) => {
        getImageFromStore(
            this.props.skew,
            this.state.object['url']['bucket'],
            filePath
        )
    }

    renderImages = () => { 
        let imageCount = this.state.object['url']['count'];
        let carosel = document.getElementById('image-page-container');

        let dots = document.createElement('DIV');
        dots.className = 'dots-wrapper'
        carosel.appendChild(dots);


        for (let i=0; i < imageCount; i++) {
            let image = document.createElement('IMG');
            image.className = 'page-image';
            image.id = `${this.props.skew}-${i}`
            image.alt = `${this.state.object['title']}`
            carosel.appendChild(image)

            getImageFromStore(
                `${this.props.skew}-${i}`,
                this.state.object['url']['bucket'],
                `${this.state.object['url']['image']}_${i}.jpeg`
            )

            let dot = document.createElement('DIV');
            dot.className = 'image-dot';
            dot.id = `dot-${this.props.skew}-${i}`
            dot.addEventListener('click', () => this.changeSlide(`${this.props.skew}-${i}`))
            dots.appendChild(dot)
        }
        this.changeSlide(`${this.props.skew}-${0}`)
    }

    changeSlide(image) {
        let thisImage = document.getElementById(image)
        let oldImages = document.getElementsByClassName('visible')
        console.log(oldImages)
        if (oldImages.length >= 1) {
            let oldImageKeys = Object.keys(oldImages)
            oldImageKeys.map(image => {
                return oldImages[image].className = 'page-image';
            })
        } 
        thisImage.className = 'page-image visible'
    }

    render() {
        return(
        <div className='image-page-container' id='image-page-container'></div>
        )
    }
}

export default ItemImage;