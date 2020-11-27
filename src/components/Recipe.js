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