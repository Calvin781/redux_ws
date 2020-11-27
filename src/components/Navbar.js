import React, { Component } from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Navbar extends Component{
    render(){
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
    }
}

const mapStateToProps = (state)=>{
    return {
        qt: state.qtItems
    }
}

export default  connect(mapStateToProps)(Navbar);