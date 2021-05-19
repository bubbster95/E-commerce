import React from 'react';
import { collectByTags } from './firebase'

class Test extends React.Component {
    handleInput = () => {
        
        let tag = document.getElementsByClassName('text-input')[0].value
        collectByTags(tag)
    }

    render() {
        return(
            <div>
                <h1>Test</h1>
                <input className='text-input' type="text"></input>
                <button onClick={() => this.handleInput() }>Test</button>
            </div>
        )
    }
}

export default Test