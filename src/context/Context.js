import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {cartReducer} from "./Reducers";
import mock from '../mocks/mock';

const Cart = createContext()

const Context = ({children}) => {

    const [animals, setAnimals] = useState(null);

    useEffect(async () => {
        const response = await fetch('http://localhost:3333/getallanimals');
        const data = await response.json();
        setAnimals(data)
    }, [])

    //what I want
    // const products = animals

    // what I have
    const products = mock
    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    });

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