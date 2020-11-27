export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const SUB_QUANTITY = 'SUB_QUANTITY';

export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
        id
    }
}

export const addQuantity = (id) => {
    return {
        type:ADD_QUANTITY,
        id
    }
}

export const subtractQuantity = (id) => {
    return {
        type: SUB_QUANTITY,
        id
    }
}