import React from 'react';

import './item-image.css'

import {getBGImageFromStore, collectionInfo} from '../../firebase';

class ItemImage extends React.Component {
constructor(props) {
    super(props)

    this.state = {
        object: {},
        tab: false
    }

    this.getInfo = async () =>{
        this.setState({
            object: await collectionInfo('product', this.props.skew)
        })

        this.renderImages()
    }

}

    componentDidMount() { this.getInfo() }

    hover = (state) => {
        let thumbs = document.getElementsByClassName('thumbs-wrapper')[0]
        if (state === 'over') {
            thumbs.className = 'thumbs-wrapper enter'
        } else {
            thumbs.className = 'thumbs-wrapper'
        }
    }

    // populates image carosel with main images and thumbnails
    renderImages = () => { 
        let imageCount = this.state.object['url']['count'];

        let carosel = document.getElementById('image-page-container');
        carosel.addEventListener('mouseover', () => this.hover('over'))
        carosel.addEventListener('mouseleave', () => this.hover())

        let thumbs = document.createElement('DIV');
        thumbs.className = 'thumbs-wrapper'


        for (let i=0; i < imageCount; i++) {
            let image = document.createElement('DIV');
            image.className = 'page-image';
            image.id = `${this.props.skew}-${i}`
            image.alt = `${this.state.object['title']}`
            carosel.appendChild(image)

            getBGImageFromStore(
                `${this.props.skew}-${i}`,
                `${this.state.object["url"]["image"]}_${i}.jpeg`,
                `${this.props.skew}-${i}-thumb`
            )

            let thumb = document.createElement('DIV');
            thumb.className = 'image-thumb';
            thumb.id = `${this.props.skew}-${i}-thumb`
            thumb.addEventListener('click', () => this.changeSlide(`${this.props.skew}-${i}`))
            thumbs.appendChild(thumb)
        }
        this.changeSlide(`${this.props.skew}-${0}`)
        carosel.appendChild(thumbs);
    }

    // toggles visibility of the image useres choose
    changeSlide(image) {
        let thisImage = document.getElementById(image)
        let oldImages = document.getElementsByClassName('visible')
        
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