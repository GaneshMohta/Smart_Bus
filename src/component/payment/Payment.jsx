import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import Header from '../Header';


export default function Payment() {
  const [amount, setAmount] = useState(0);
  const [userCard , setUserCard] = useState('');
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const validateCard = async () => {
    try{
      const res = await axios.post('http://localhost:3000/validate-card',{
        user_card : userCard
      });

      if(res.data.message === 'Card Exists'){
        return true;
      }
      else{
        alert("Card does not register or Invalid");
        return false;
      }
    }
    catch(e){
      console.log("Card ",e);
      return false;
    }
  };

  const handlePayment = async () => {

    // const isValid = await validateCard();

    // if(!isValid){
    //   return;
    // }

    // const res = await loadRazorpayScript();

    // if (!res) {
    //   alert('Failed to load Razorpay SDK');
    //   return;
    // }

    // Request backend to create an order
    const orderResponse = await axios.post('http://localhost:3000/create-order', {
      amount: amount,
    });

    const { amount: orderAmount, id: orderId, currency } = orderResponse.data;

    const options = {
      key: "rzp_test_9zumki8SHk1M7c", // Do not expose your secret key here, only key_id
      amount: orderAmount,
      currency: currency,
      name: 'BusZ Recharge',
      description: 'Payment for recharge',
      order_id: orderId,
      handler: async function (response) {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        const verifyResponse = await axios.post('http://localhost:3000/verify-payment', {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          user_card : userCard,
          amount_paid: amount
        });

        if (verifyResponse.data.message === 'Payment verified successfully') {
          alert(`Payment successful Your new balance is ${verifyResponse.data.newAmount}!`);
        } else {
          alert('Payment verification failed');
        }
      },
      prefill: {
        name: 'Ganesh',
        email: 'ganimaheshwari07@example.com',
        contact: '6374620670',
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return <>
  <Header />
    <div style={{display:'flex',flexDirection:'column',gap:'2vh',alignItems:'center',justifyContent:'center',height:'80vh'}}>
      <h2>Recharge Application</h2>
      <input
        type="text"
        value={userCard}
        style={{width:'40vw',height:'5vh'}}
        onChange={(e) => setUserCard(e.target.value)}
        placeholder="Card Number"
      />
      <input
        type="number"
        value={amount}
        style={{width:'40vw',height:'5vh'}}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handlePayment}
      style={{width:'20vw',height:'5vh'}}
      >Pay with UPI</button>
    </div>
  </>;
};
