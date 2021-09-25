import { useState, useEffect } from "react";
import { getCartItems, deleteCartItem, updateCartItems, createSellDetails } from "../../api/apiProduct";
import CartItem from './CartItem';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [modal, setModal] = useState(false);

    const loadCart = () => {
        getCartItems()
            .then(response => setCartItems(response.data))
    }
    useEffect(() => {
        deleteCartItem()
    }, []);

    useEffect(() => {
        loadCart();
    });

    const increaseItem = (item) => () => {
        const cartItem = {
            ...item,
            qty: item.qty + 1
        }
        updateCartItems(cartItem)
            .then(response => loadCart())
    }

    const decreaseItem = (item) => () => {
        if (item.qty === 1) return
        const cartItem = {
            ...item,
            qty: item.qty - 1
        }
        updateCartItems(cartItem)
            .then(response => loadCart())
    }

    const getCartTotal = () => {
        const arr = cartItems.map(item => item.price * item.qty)
        const sum = arr.reduce((a, b) => a + b, 0);
        return sum;
    }

    const toggle = () => setModal(!modal);

    /*const sellDetails = () => {
        console.log(cartItems)
        /*cartItems.map(item=>{
            const sellDetails={
                date:new Date(),
                items:item.name,
                qty:item.qty,
                price:item.price,
                total:item.price * item.qty
            }
        })
        
        //createSellDetails()
    }*/

    return (
        <div >
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>
                    <div className="modal-title">
                        <p>POS</p>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Items</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Unit</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr>
                                    <td>{item.product.name}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.product.unit}</td>
                                    <td>৳ {item.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={3} className="text-center">Total</td>
                                <td>৳ {getCartTotal()}</td>
                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button onClick={toggle} className="btn btn-primary">Back</button>
                    <button onClick={toggle} className="btn btn-primary">Print</button>
                </ModalFooter>
            </Modal>
            <div id="cartItem-section">
                <p style={{ wordSpacing: "10px" }}><span className="span"><i class="fa fa-shopping-cart mr-1"></i>Purchase</span>  Items</p>
                <hr />
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit</th>
                            <th scope="col" align="right">Price</th>
                            <th scop="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, i) => <CartItem
                            item={item}
                            serial={i + 1}
                            key={item._id}
                            increaseItem={increaseItem(item)}
                            decreaseItem={decreaseItem(item)}
                        />)}
                        <tr>
                            <th scope="row" />
                            <td colSpan={3}>Total</td>
                            <td>৳ {getCartTotal()} </td>
                            <td />
                        </tr>
                        <tr>
                            <th scope="row" />
                            <td colSpan={6} className="text-right">
                                <button onClick={toggle} className="btn btn-primary mr-4">Save and Checkout</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Cart;