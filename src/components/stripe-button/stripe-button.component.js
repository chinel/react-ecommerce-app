import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
//Note before we can process payment in stripe, stripe want the prices to be in cents so if you have dollars you have to convert to cents by multipying by 100
const priceForStripe = price * 100;
const publishableKey  = 'pk_test_8iTnEuniHDHAYKS6y9QrSyJE';

const OnToken = token =>{
    console.log(token);
    alert("Payment successful");
}

return(
    <StripeCheckout
    label="Pay Now"
    name="CRWN Clothing Ltd."
    billingAddress
    shippingAddress
    image="https://sendeyo.com/up/d/f3eb2117da"
    description={`Your total price is ${price}`}
    amount={priceForStripe}
    panelLabel="Pay Now"
    token={OnToken}
    stripeKey={publishableKey}

    />
)
}

export default StripeCheckoutButton;