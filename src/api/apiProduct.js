import { API } from '../utils/config';
import axios from 'axios';

export const getCategories=()=>{
    return axios.get(`${API}/category`)
}

export const getProducts = () => {
    return axios.get(`${API}/product`)
}

export const addToCart = (cartItem) => {
    return axios.post(`${API}/cart`, cartItem, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
export const getCartItems = () => {
    return axios.get(`${API}/cart`)
}

export const updateCartItems = (cartItem) => {
    return axios.put(`${API}/cart`, cartItem, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const deleteCartItemById = (cartItem) => {
    return axios.delete(`${API}/cart/${cartItem._id}`)
}

export const deleteCartItem = () => {
    return axios.delete(`${API}/cart/`)
}

export const createSellDetails = (sellDetails) => {
    return axios.post(`${API}/cart/SellDetails`, sellDetails, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}