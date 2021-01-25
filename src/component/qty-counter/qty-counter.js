import React from 'react';


class QtyCounter extends React.Component {

    changeQty = (add) => {
        let itemCount = localStorage[this.props.skew]
        let quantity = document.getElementsByClassName('item-quantity')[0]

        if (this.props.updateCount) {
            if (itemCount >= 1) {
                localStorage[this.props.skew] = parseInt(itemCount) + add
            } else if (add === 1) {
                localStorage[this.props.skew] = parseInt(itemCount) + add
            }
            this.props.updateCount()
            
        } else {
            if (quantity.innerHTML >= 1) {
                quantity.innerHTML = parseInt(quantity.innerHTML) + add
            } else if (add === 1) {
                quantity.innerHTML = parseInt(quantity.innerHTML) + add
            }
        }
    }

    checkQty = () => {
        if (localStorage[this.props.skew]) {
            return localStorage[this.props.skew]
        } else {
            return 1
        }
    }

    render() {
        return(
            <div className='qty'>
            <p>Qty: </p>
                <span>
                    <button onClick={() => this.changeQty(-1)}>{'<'}</button>
                    <span className='item-quantity'>{this.checkQty()}</span>
                    <button onClick={() => this.changeQty(1)}>{'>'}</button>
                </span>
            </div>
        )
    }
}

export default QtyCounter;