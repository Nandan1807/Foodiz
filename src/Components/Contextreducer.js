import { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDespatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "Add":
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size }]

        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index,1);
            return newArr;
        
        case "UPDATE":
            let arr = [...state];
            arr.find((food,index)=>{
                if(food.id === action.id){
                    arr[index] = {...food , qty: parseInt(action.qty) + food.qty , price: action.price + food.price}
                }
            }) 
            return arr;
        
        case "DROP":
            let empArr = [];
            return empArr;
            
        default:
            console.log("error in reducer");
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDespatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDespatchContext.Provider>
    );
}

export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDespatchContext);