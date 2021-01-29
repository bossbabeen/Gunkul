import axios from "axios";
import React, { useState, useEffect } from 'react'
import './ItemList.scss'
import trash from '../asset/trash.png';

function ItemList() {
    const [itemList, setItemList] = useState([])
    const [cartList, setCartList] = useState([])
    var totalPrice = 0;
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products').then(res => {
            setItemList(res.data)
        })
    }, [])
    return (
        <div className="flex-container">
            <div className="itemList">
                <h2>Product</h2>
                {itemList.map((item) => {
                    return (
                        <div className="flex-item" key={item.id} onClick={() => setCartList(addItemToCart(item, cartList))}>
                            <img src={item.image} alt={item.title} />
                            <p>{item.title}</p>
                            <p style={{ fontWeight: 'bold' }}>{item.price} Baht</p>
                        </div>
                    )
                })}
            </div>
            <div className="cart-order">
                <h2>My Cart</h2>
                {cartList.map((item, index) => {
                    totalPrice = totalPrice + (item.price * item.amount)
                    return (
                        <div className="cart-item" key={item.id}>
                            <div className="cart-item-info">
                                <img src={item.image} alt={item.title} />
                                <p>{item.title}</p>
                            </div>
                            <div className="amount-item">
                                <p style={{ fontWeight: 'bold', color: 'blue' }}>{item.price}.-</p>
                                <button onClick={() => setCartList(minusItemCartBtn(cartList, index))}>-</button>
                                <span>{item.amount}</span>
                                <button onClick={() => setCartList(plusItemCartBtn(cartList, index))}>+</button>
                                <img onClick={() => setCartList(removeItemInCart(cartList, index))} src={trash} alt="remove item in cart"/>
                            </div>
                        </div>
                    )
                })}
                <p>Total price: {totalPrice.toFixed(2)}</p>
            </div>
        </div>
    )
}

const addItemToCart = (item, cartList) => {
    var cartListB = [...cartList]
    var cartItem = cartListB.find(cartItem => cartItem.id === item.id)
    if (cartItem !== undefined) {
        cartItem.amount++
    } else {
        item.amount = 1;
        cartListB.push(item)
    }
    return cartListB
}

const plusItemCartBtn = (cartList, index) => {
    var cartListB = [...cartList]
    cartListB[index].amount++
    return cartListB;
}

const minusItemCartBtn = (cartList, index) => {
    var cartListB = [...cartList]
    if (cartListB[index].amount>1) {
        cartListB[index].amount--
    }
    return cartListB;
}

const removeItemInCart = (cartList, index) => {
    var cartListB = [...cartList]
    cartListB.splice(index, 1)
    return cartListB
}

export default ItemList;