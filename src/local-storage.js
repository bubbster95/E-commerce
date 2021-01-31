export const getCart = () => {
    let cart = localStorage.getItem('cart')
    return JSON.parse(cart)
}

export const setCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
}