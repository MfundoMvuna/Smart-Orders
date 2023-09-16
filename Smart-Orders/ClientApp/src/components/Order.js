import React, { Component } from 'react';
import './Order.css';

export default class Order extends Component {
    static displayName = Order.name;

    render() {
        return (
            <div>
                <h1>Make Your Order</h1>
                <div className="order-container">
                    {this.renderProduct("full_chicken.jpg", "Full house - full chicken.", "Price: R109.99")}
                    {this.renderProduct("quarter_leg.jpg", "Half chicken and Quarter Leg.", "Price: R59.99")}
                    {this.renderProduct("drum_sticks.jpg", "7 chicken drumsticks.", "Price: R59.99")}
                </div>
                
            </div>
        );
    }


    renderProduct(imageSrc, description, price) {
        return (
            <div className="product">
                <div className="column">
                    <img src={imageSrc} alt="Product" />
                </div>
                <div className="column">
                    <p>{description}</p>
                </div>
                <div className="column">
                    <p>{price}</p>
                </div>
            </div>
        );
    }
}

export { Order };