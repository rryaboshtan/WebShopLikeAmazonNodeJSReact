import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer}
    from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : []
    }
};

console.log('INITIALSTATEEEEEEEEEEE', initialState)
const reducer = combineReducers({
    productListReducer,
    productDetailsReducer,
    cart: cartReducer, 
})

const store = createStore(
    reducer, 
    initialState, 
    // composeWithDevTools(applyMiddleware(thunk) )
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
