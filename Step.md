# Etat Initial

1. index.css -> pour toute la partie graphics préconfigurer (framework Materialize)
1. index.js -> chargement de l'app
1. App.js -> Préreglage des routes utilisée
1. components -> Création des differentes class pour l'app
    - Cart.js
    - Home.js
    - Navbar.js
    - reducers
        - cartReducer -> Données initial pour l'app

# Step 1 - Stéphane

# `index.js`

Importer le store
```js
    import { createStore } from 'redux';
```

Creer le store
```js
    const store = createStore();
```

Importer le provider
```js
    import { Provider } from 'react-redux';
```

Implementation du provider
```js
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
```

Importer le reducer et le passer en parametre au store
```js
    import cartReducer from './components/reducers/cartReducer';

    const store = createStore(cartReducer);
```

# cartReducer.js

Creation de la methode cartReducer
```js
    const cartReducer = (state = initState, action) => {
        return state;
    }
    export default cartReducer;
```

Ajout dans l'objet initState deux proprietes
```js
    total: 0,
    qtItems: 0
```

# Home.js

Importation du state
```js
    import { connect } from 'react-redux';
```

Connection du state au component Home
```js
    const mapStateToProps = (state)=>{
        return {
            items: state.items
        }
    }
    export default connect(mapStateToProps)(Home);
```

Affichage dans la console du state
```js
    console.log(this.props.items);
```

Vider le render et afficher le rendu
```js
    const itemList = this.props.items.map(item => {
        return (
            <div className="card" key={item.id}>
                <div className="card-image">
                    <img src={item.img} alt={item.title}/>
                    <span className="card-title">{item.title}</span>
                    <span to="/" className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></span>
                </div>

                <div className="card-content">
                    <p>{item.desc}</p>
                    <p><b>Price: {item.price}$</b></p>
                </div>
            </div>
        );
    });

    return (
        <div className="container">
            <h3 className="center">Our items</h3>
            <div className="box">
                {itemList}
            </div>
        </div>
    );
```

# Navbar.js

Importation du state
```js
    import { connect } from 'react-redux';
```

Connection du state au component Navbar
```js
    const mapStateToProps = (state)=>{
        return {
            qt: state.qtItems
        }
    }
    export default connect(mapStateToProps)(Navbar);
```

Importation de Link
```js
    import { Link } from 'react-router-dom';
```

Vider le render et afficher le rendu
```js
    return(
        <nav className="nav-wrapper">
            <div className="container">
                <Link to="/" className="brand-logo">BeShop</Link>
                <ul className="right">
                    <li><Link to="/">Shop</Link></li>
                    <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                    <li className="qtItems">({this.props.qt})</li>
                </ul>
            </div>
        </nav>
    );
```

# Step 2 - Gerardo

# Home.js

Creation du onClick sur le bouton add

```js
    onClick={()=>{this.handleClick(item.id)}}
```

Creer la methode handleClick

```js
    handleClick = (id)=>{
        this.props.addToCart(id);
    }
```

Connection de la methode au store
```js
    const mapDispatchToProps= (dispatch)=>{    
        return{
            addToCart: (id)=>{dispatch(addToCart(id))}
        }
    }
    export default connect(mapStateToProps, mapDispatchToProps)(Home)
```

# components/actions/cartActions.js (création du fichier)

```js
    export const ADD_TO_CART = 'ADD_TO_CART';
    export const addToCart= (id)=>{
        return{
            type: ADD_TO_CART,
            id
        }
    }
```

# Home.js

Importation de la methode cartActions
```js
    import { addToCart } from './actions/cartActions';
```

# cartReducer.js

Ajout du cas ADD_TO_CART dans le switch
```js
    switch(action.type){
        case ADD_TO_CART:
            let addedItem = state.items.find(item=> item.id === action.id)
            let existed_item= state.addedItems.find(item=> action.id === item.id)
            if(existed_item)
            {
                addedItem.quantity += 1 
                return{
                    ...state,
                    total: state.total + addedItem.price,
                    qtItems: state.qtItems + 1
                }
            }
            else{
                addedItem.quantity = 1;
                let newTotal = state.total + addedItem.price 
                return{
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total : newTotal,
                    qtItems: state.qtItems + 1
                }
            }
        default:
            return state
    }
```

Ajout addedItems dans l'objet initState
```js
    addedItems: [],
```

Importer la constante
```js
    import { ADD_TO_CART } from '../actions/cartActions';
```

# components/Recipe.js (Création du fichier)

```js
    import React, { Component } from 'react'
    import { connect } from 'react-redux'

    class Recipe extends Component{
        render(){      
            
            return(
                <div className="container">
                    <div className="collection">
                        <li className="collection-item">
                            <label>
                                <input type="checkbox" ref="shipping"/>
                                <span>Shipping(+6$)</span>
                            </label>
                        </li>
                        <li className="collection-item"><b>Total: {this.props.total} $</b></li>
                    </div>
                    <div className="checkout">
                        <button className="waves-effect waves-light btn">Checkout</button>
                    </div>
                </div>
            )
        }
    }

    const mapStateToProps = (state)=>{
        return{
            addedItems: state.addedItems,
            total: state.total,
            qtItems: state.qtItems
        }
    }

    export default connect(mapStateToProps)(Recipe);
```

# Cart.js

Importation
```js
    import { connect } from 'react-redux';
    import { Link } from 'react-router-dom';
    import Recipe from './Recipe';
```

Affichage de la vue
```js
let addedItems = this.props.items.length ?
    (  
        this.props.items.map(item=>{
            return(                       
                <li className="collection-item avatar" key={item.id}>
                    <div className="item-img"> 
                        <img src={item.img} alt={item.img} className=""/>
                    </div>
                
                    <div className="item-desc">
                        <span className="title">{item.title}</span>
                        <p>{item.desc}</p>
                        <p><b>Price: {item.price}$</b></p> 
                        <p>
                            <b>Quantity: {item.quantity}</b> 
                        </p>
                        <div className="add-remove">
                            <Link to="/cart"><i className="material-icons">arrow_drop_up</i></Link>
                            <Link to="/cart"><i className="material-icons">arrow_drop_down</i></Link>
                        </div>
                        <button className="waves-effect waves-light btn pink remove">Remove</button>
                    </div>                                    
                </li>
            )
        })
    ):(
        <p>Empty.</p>
    )
    return(
        <div className="container">
            <div className="cart">
                <h5>You have ordered:</h5>
                <ul className="collection">
                    {addedItems}
                </ul>
            </div> 
            <Recipe />     
        </div>
    )
```

Connection au store
```js
    const mapStateToProps = (state)=>{
        return{
            items: state.addedItems
        }
    }

    export default connect(mapStateToProps)(Cart);
```

importation de la connection
```js
    import { connect } from 'react-redux';
```

# Step 3 - Calvin

# PARTIE 1 ADD

# Cart.js

Creation du onClick sur le bouton add

```js
    onClick={()=>{this.handleAddQuantity(item.id)}}
```

Creer la methode handleAddQuantity

```js
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
```

# cartActions.js

creer la constante + la methode d'ajout

```js
    export const ADD_QUANTITY = 'ADD_QUANTITY';
    export const addQuantity=(id)=>{
        return{
            type: ADD_QUANTITY,
            id
        }
    }
```

# Cart.js

Connection des functions au store
```js
    const mapDispatchToProps = (dispatch)=>{
        return{
            addQuantity: (id)=>{dispatch(addQuantity(id))}
        }
    }
    export default connect(mapStateToProps, mapDispatchToProps)(Cart);
```

Importer la methode
```js
    import {addQuantity} from './actions/cartActions'
```

# cartReducer.js

Ajout du cas ADD_QUANTITY dans le switch
```js
    case ADD_QUANTITY:
        let addedQuantity = state.items.find(item=> item.id === action.id)
        addedQuantity.quantity += 1 
        let addNewTotal = state.total + addedQuantity.price
        return{
            ...state,
            total: addNewTotal,
            qtItems: state.qtItems + 1
        }
```

importer la constante
```js
    import { ADD_TO_CART, ADD_QUANTITY} from '../actions/cartActions';

```

# PARTIE 2 SUBSTRACT

# Cart.js

Creation du onClick sur le bouton subtract

```js
    onClick={()=>{this.handleSubtractQuantity(item.id)}}
```

Creer la methode handleSubtractQuantity

```js
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }
```

# cartActions.js

creer la constante + la methode de subtract

```js
    export const SUB_QUANTITY = 'SUB_QUANTITY';
    export const subtractQuantity=(id)=>{
        return{
            type: SUB_QUANTITY,
            id
        }
    }
```

# Cart.js

Connection des functions au store
```js
    const mapDispatchToProps = (dispatch)=>{
        return{
            addQuantity: (id)=>{dispatch(addQuantity(id))},
            subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
        }
    }
```

Importer la methode
```js
    import {addQuantity, subtractQuantity} from './actions/cartActions'
```

# cartReducer.js

Ajout du cas SUB_QUANTITY dans le switch
```js
    case SUB_QUANTITY:
        let subQuantity = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(subQuantity.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let subNewTotal = state.total - subQuantity.price
            return{
                ...state,
                addedItems: new_items,
                total: subNewTotal,
                qtItems: state.qtItems - 1
            }
        }
        else {
            subQuantity.quantity -= 1
            let subNewTotal = state.total - subQuantity.price
            return{
                ...state,
                total: subNewTotal,
                qtItems: state.qtItems - 1
            }
        }
```

importer la constante
```js
    import { ADD_TO_CART, ADD_QUANTITY, SUB_QUANTITY} from '../actions/cartActions';

```

# Step 4 - Maxendre

# PARTIE 1 REMOVE

# Cart.js

Creation du onClick sur le bouton remove

```js
    onClick={()=>{this.handleRemove(item.id)}}
```

Creer la methode handleRemove

```js
    handleRemove = (id)=>{
        this.props.removeItem(id);
    }
```

# cartActions.js

creer la constante + la methode de removeItem

```js
    export const REMOVE_ITEM = 'REMOVE_ITEM';
    export const removeItem=(id)=>{
        return{
            type: REMOVE_ITEM,
            id
        }
    }
```

# Cart.js

Connection des functions au store
```js
    const mapDispatchToProps = (dispatch)=>{
        return{
            addQuantity: (id)=>{dispatch(addQuantity(id))},
            subtractQuantity: (id)=>{dispatch(subtractQuantity(id))},
            removeItem: (id)=>{dispatch(removeItem(id))}
        }
    }
```

Importer la methode
```js
    import {addQuantity, subtractQuantity, removeItem} from './actions/cartActions'
```

# cartReducer.js

Ajout du cas REMOVE_ITEM dans le switch
```js
    case REMOVE_ITEM:
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let remNewTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        return{
            ...state,
            addedItems: new_items,
            total: remNewTotal,
            qtItems: state.qtItems - itemToRemove.quantity
        }
```

importer la constante
```js
    import { ADD_TO_CART, ADD_QUANTITY, SUB_QUANTITY, REMOVE_ITEM} from '../actions/cartActions';

```

# PARTIE 2 - ADD ET SUB SHIPPING

# cartActions.js

Ajout des constantes ADD ET SUB SHIPPING
```js
    export const ADD_SHIPPING = 'ADD_SHIPPING';
    export const SUB_SHIPPING = 'SUB_SHIPPING';
```

# Recipe.js

Creation du onChange sur le checkbox
```js
    onChange= {this.handleChecked}
```

Ajout de la methode handleChecked
```js
    handleChecked = (e)=>{
        if(e.target.checked){
            this.props.addShipping();
        }
        else{
            this.props.substractShipping();
        }
    }
```

Connection des functions au store
```js
    const mapDispatchToProps = (dispatch)=>{
        return{
            addShipping: ()=>{dispatch({type: ADD_SHIPPING})},
            substractShipping: ()=>{dispatch({type: SUB_SHIPPING})}
        }
    }
    export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
```

Ajout de l'import des constantes 
```js
    import { ADD_SHIPPING, SUB_SHIPPING} from './actions/cartActions';
```

# cartReducer.js

Ajout du cas ADD_SHIPPING et SUB_SHIPPING dans le switch
```js
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
```

importer les constantes
```js
    import { ADD_TO_CART, ADD_QUANTITY, SUB_QUANTITY, REMOVE_ITEM, ADD_SHIPPING, SUB_SHIPPING } from '../actions/cartActions';

```

# Recipe.js

```js
    componentWillUnmount() {
        if(this.refs.shipping.checked)
            this.props.substractShipping()
    }
```