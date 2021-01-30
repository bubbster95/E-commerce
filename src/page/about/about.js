import React from 'react';

import './about.css'

import HeroImage from '../../component/hero-image/hero-image'

class About extends React.Component {
    render() {
        return <div className="about-page">
            <HeroImage page='About' />
            <div className='welcome-text'>
                <h2>Welcome</h2>
                <p>Thank you for visiting Base Weight, an E-commerce website designed using React, React-Router-Dom, and Firebase.
                Some key features to look for on this site are as follows.</p>

                <p>The sign in page uses firebase authentication, allowing you to create a user account, or login with your google account like any other site.
                In addition to login verification this site uses firebase to store information about products as well as the product images.
                Accessing the firebase database was an engaging challenge and fun to solve.</p>

                <p>Having used React and Vue prior to this project I feel as if this site has much cleaner code then my previous projects.
                Using React-Router turned out to be a rewarding process and learning dynamic routing was the highlight of this project.</p>

                <p>Lastly, I created this entire project using Photography and copy from REI.com.
                I don’t take credit for this excellent photography, but if you like a product you can find links to any item by adding it to your cart and clicking the check out button.</p>

                <p>Lastly I would like to credit the photographers who took the hero images at the top of each page, links to their work are down below.</p>
                <a href='https://unsplash.com/photos/GjsWjLCIh5I' rel='noreferrer' target='_blank'>Kenneth Hargrave</a>
                <a href='https://unsplash.com/@intricateexplorer' rel='noreferrer' target='_blank'>Intricate Explorer</a>
                <a href='https://unsplash.com/@t_galler' rel='noreferrer' target='_blank'>Thomas Galler</a>
                <a href='https://unsplash.com/@ugurpeker' rel='noreferrer' target='_blank'>Ugur Peker</a>
            </div>
        </div>
    }
}

export default About;