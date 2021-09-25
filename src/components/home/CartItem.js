import React from 'react';
import { deleteCartItemById } from '../../api/apiProduct';

const CartItem = ({ item, serial,decreaseItem,increaseItem}) => {

    const deleteCartItem = item => () => {
        const cartItem = {
            _id: item._id,
        }
        deleteCartItemById(cartItem)
    }
    return (
        <tr>
            <th scope="row">{serial}</th>
            <td>{item.product.name}</td>
            <td>
                <button className="btn btn-outline-secondary btn-sm" onClick={decreaseItem}>-</button>
                &nbsp;&nbsp;{item.qty}&nbsp;&nbsp;
                <button className="btn btn-outline-secondary btn-sm" onClick={increaseItem}>+</button>
            </td>
            <td>{item.product.unit}</td>
            <td>৳ {item.price * item.qty}</td>
            <td><button onClick={deleteCartItem(item)} className="btn btn-secondary btn-sm"><i class="fa fa-close"></i></button></td>
        </tr>
        
        )
};


export default CartItem;