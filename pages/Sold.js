import React, { Component } from 'react'
import DropIn from "braintree-web-drop-in-react";
export default class Subscriptions extends Component {
instance;
state = {
        clientToken: null,
        purchaseComplete: false  
};
    
    async buy() {
        // Send the nonce to your server
        const { nonce } = await this.instance.requestPaymentMethod();
        const res = await fetch('/api/payment/checkout',
            {
              body: JSON.stringify({
                paymentMethodNonce: nonce,
                user_id: "1234"
              }),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }
          )
    
        const result = await res.json()
        if (result.result == "success") {
            this.setState({
                purchaseComplete: true
            });
        }
    }
        
    render() {
        if (this.state.purchaseComplete) {
            return (
              <div>
                <h1>Completed.</h1>
              </div>
            );
          } else {
          return (
            <div>
              <DropIn
                options={{ authorization: "sandbox_kt8gsmds_87nhq24bndqjb5dk"}}
                onInstance={(instance) => (this.instance = instance)}
              />
              <button onClick={this.buy.bind(this)}>Submit</button>
            </div>
          );
          }
        }
    }