import { useState, useEffect } from "react";
import { getCategories, getProducts, addToCart } from "../../api/apiProduct";
import { API } from '../../utils/config';
import Add_Icon from '../../assests/img/add-icon.png';


const ItemList = () => {
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getCategories()
            .then(response => setCategory(response.data))
            .catch(err => setError('Failed to load category'))
        getProducts()
            .then(response => setProduct(response.data))
            .catch(err => setError('Failed to load Product'))
    }, []);

    const handleAddToCart = product => () => {
        const cartItem = {
            product: product._id,
            price: product.price,
        }
        addToCart(cartItem)
    }

    return (
        <div >
            <div id="item-section">
                <p>Categories</p>
                <hr />
                <div class="item scrollmenu">
                    <div className="card">
                        <div className="card-image">
                            <img className="card-img" src={Add_Icon} alt="" />
                        </div>
                        <div className="card-body p-0">
                            <p className="font-weight-bold">Add New</p>
                        </div>
                    </div>
                    {category.map(item => (
                        <div className="card">
                            <div className="card-image">
                                <img className="card-img"
                                    src={`${API}/category/photo/${item._id}`}
                                    alt="" />
                            </div>
                            <div className="card-body p-0">
                                <p className="font-weight-bold">{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div id="item-section">
                <p>Products</p>
                <hr />
                <div class="item">
                    <div className="card">
                        <div className="card-image">
                            <img className="card-img" src={Add_Icon} alt="" />
                        </div>
                        <div className="card-body p-0">
                            <p className="font-weight-bold">Add New</p>
                        </div>
                    </div>
                    {product.map(item => (
                        <a onClick={handleAddToCart(item)} style={{ cursor: "pointer" }}>
                            <div className="card">
                                <div className="card-image">
                                    <img className="card-img"
                                        src={`${API}/product/photo/${item._id}`}
                                        alt="" />
                                </div>
                                <div className="card-body p-0">
                                    <p className="font-weight-bold">{item.name}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ItemList;
