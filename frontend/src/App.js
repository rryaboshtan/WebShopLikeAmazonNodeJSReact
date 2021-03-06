import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route} from 'react-router-dom';

import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const { userInfo } = useSelector(state => state.userSignin);
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    }

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div className="brand">
                        <Link to="/">
                            <button >
                                &#9776;
                            </button>
                        </Link>
                        <Link to="/">
                            amazon
                        </Link>
                    </div>

                    <div className="header-links">
                        <Link to="/cart/1">Cart
                         {
                                (cartItems.length > 0) &&
                                <span className="badge">{cartItems.length}</span>
                            }
                        </Link>
                        {
                            userInfo ?
                                <div className = "dropdown">
                                    <Link to="#">
                                        {userInfo.name} <i className="fa fa-caret-down"></i>
                                    </Link>
                                    <ul className="dropdown-content">
                                        <Link to="#signout" onClick={signoutHandler}>
                                            Sign Out
                                        </Link>
                                    </ul>
                                </div>
                                : <Link to="/signin/signin"> Sign In</Link>
                        }
                    </div>
                </header>
                <main className="main">
                    <Route path="/cart/:id?" component={CartScreen} exact></Route>
                    <Route path="/signin/signin" component={SigninScreen} exact></Route>
                    <Route path="/register/register" component={RegisterScreen} exact></Route>
                    <Route path="/shipping/shipping" component={ShippingAddressScreen} exact></Route>
                    <Route path="/payment/payment" component={PaymentMethodScreen} exact></Route>
                    <Route path="/placeorder/placeorder" component={PlaceOrderScreen} exact></Route>
                    <Route path="/" component={HomeScreen} exact></Route>
                    <Route path="/:id" component={ProductScreen} exact></Route>
                </main>

                <footer className="row center">
                    All rights reserved.
            </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;