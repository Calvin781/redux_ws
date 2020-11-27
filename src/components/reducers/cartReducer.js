import Item1 from '../../images/item1.jpg';
import Item2 from '../../images/item2.jpg';
import Item3 from '../../images/item3.jpg';
import Item4 from '../../images/item4.jpg';
import Item5 from '../../images/item5.jpg';
import Item6 from '../../images/item6.jpg';
import { ADD_TO_CART, ADD_QUANTITY, SUB_QUANTITY, REMOVE_ITEM, ADD_SHIPPING, SUB_SHIPPING } from '../actions/cartActions';

const initState = {
    items: [
        { id: 1, title: 'Razer BlackWidow', desc: "The Razer BlackWidow Elite is designed specifically for gaming as it features the Razer Green mechanical keys for unprecedented speed and responsiveness.", price: 115, img: Item1 },
        { id: 2, title: 'Fierce PC Draconis', desc: "The Fierce PC Draconis LED Keyboard and Mouse is the perfect Gamer Solution to Peripherals, featuring 7 different colours and a simple LED Switch control gives a user ultimate control of their look.", price: 80, img: Item2 },
        { id: 3, title: 'GeForce RTX 2060', desc: "Ultra-realistic graphics, an ultra-immersive VR and breathtaking gaming performance to enjoy the best of today's and tomorrow's video games.", price: 400, img: Item3 },
        { id: 4, title: 'ASUS Z11PA-D8', desc: "With the ASUS Z11PA-D8 motherboard you have a solid base to accommodate up to 2 Intel Xeon LGA 3647 processors.", price: 670, img: Item4 },
        { id: 5, title: 'iiyama ProLite', desc: "The iiyama ProLite XB3270QS-B1 is a 32\" WQHD display designed for graphic designers. Thanks to the 2560 x 1440 resolution, your images are clearer and more detailed than on Full HD displays.", price: 160, img: Item5 },
        { id: 6, title: 'ALTERNATE Gamer', desc: "The Alternate Gamer iCUE Certified RTX 3090 is the cream of the crop in terms of both performance and appearance. There isn't a mouth that doesn't stay open when you show off this superior build.", price: 3999, img: Item6 }
    ],
    total: 0,
    qtItems: 0,
    addedItems: []
}

const cartReducer = (state = initState, action) => {

    switch (action.type) {

        case ADD_TO_CART:
            let addedItem = state.items.find(item => item.id === action.id);
            let existed_item = state.addedItems.find(item => action.id === item.id);
            if (existed_item) {
                addedItem.quantity += 1;
                return {
                    ...state,
                    total: state.total + addedItem.price,
                    qtItems: state.qtItems + 1
                }
            } else {
                addedItem.quantity = 1;
                let newTotal = state.total + addedItem.price;
                return {
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total: newTotal,
                    qtItems: state.qtItems + 1
                }
            }

        case ADD_QUANTITY:

            let addedQuantity = state.items.find(item => item.id === action.id);
            addedQuantity.quantity += 1;
            let addNewTotal = state.total + addedQuantity.price;

            return {
                ...state,
                total: addNewTotal,
                qtItems: state.qtItems + 1
            }


        case SUB_QUANTITY:

            let subQuantity = state.items.find(item => item.id === action.id) // C'est le produit qui correspond à l'id qui provient du click

            if (subQuantity.quantity === 1) { // Si on arrive à 0 on retire le produit de la liste

                let new_items = state.addedItems.filter (item => item.id !== action.id);
                let subNewTotal = state.total - subQuantity.price

                return {
                    ...state, addedItems : new_items, total : subNewTotal, qtItems: state.qtItems - 1
                }
            }

            else { 
                subQuantity.quantity -= 1 ;
                let subNewTotal = state.total - subQuantity.price;

                return { ...state, total : subNewTotal, qtItems: state.qtItems - 1}
            }
            
        case REMOVE_ITEM:
            let itemToRemove = state.addedItems.find(item =>action.id === item.id);
            let new_items = state.addedItems.filter(item => action.id !== item.id);

            let remNewTotal = state.total -(itemToRemove.price * itemToRemove.quantity);
            return {
                ...state,
                addedItems : new_items,
                total: remNewTotal,
                qtItems: state.qtItems - itemToRemove.quantity
            }

        case ADD_SHIPPING:
            return{
                ...state,
                total: state.total + 6
            }

        case SUB_SHIPPING:
            return{
                ...state,
                total: state.total - 6
            }

          
        default:
            return state
    }
}


export default cartReducer;