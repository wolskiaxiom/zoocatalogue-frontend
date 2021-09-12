import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {cartReducer} from "./Reducers";
import axios from "axios";

const Cart = createContext()

const Context = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, {
        products: [],
        cart: []
    });

    useEffect(() => {
        const getAnimals = async () => {
            let response = await axios.get('http://localhost:3333/getallanimals');
            if (response.status === 200) {
                dispatch({
                    type: "RELOAD",
                    payload: {products: response.data,
                        cart: state.cart
                    },
                })
            }
        };

        getAnimals();
    }, []);

    return (
        <Cart.Provider value={{state, dispatch}}>
            {children}
        </Cart.Provider>
    )
}

export default Context

export const CartState = () => {
    return useContext(Cart);
};