import Menu from '../Menu';
import ItemList from './ItemList';
import Cart from './Cart'

const Home=()=>{
    return(
        <div>
            <div><Menu/></div>
            <div>
                <div className="row">
                    <div className="col-6">
                        <ItemList/>
                    </div>
                    <div className="col-6">
                       <Cart/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;