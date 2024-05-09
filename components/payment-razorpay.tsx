"use client";
// import { useState } from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";

// const PaymentRazorPay = () => {
//   const [amount, setAmount] = useState(0);

//   const handlePayment = async () => {
//     const data = { amount: amount }; // Amount in Rupees

//     const response = await fetch("/api/orders/create-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     const result = await response.json();

//     const options = {
//       key: process.env.RAZORPAY_KEY_ID, // Use the key_id generated from the Razorpay dashboard and expose it to the frontend securely
//       amount: result.amount, // Same as amount entered
//       currency: result.currency,
//       name: "Your Company Name",
//       description: "Test Transaction",
//       order_id: result.id,
//       handler: function (response: any) {
//         // handle the payment success logic here
//         alert(
//           `Payment successful! Payment ID: ${response.razorpay_payment_id}`
//         );
//       },
//       prefill: {
//         name: "Gaurav Kumar",
//         email: "gaurav.kumar@example.com",
//         contact: "9999999999",
//       },
//       notes: {
//         address: "note value",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     var paymentObject = new window.Razorpay(options);

//     paymentObject.open();
//   };
//   return (
//     <div className="flex  gap-4">
//       <Input
//         type="number"
//         value={amount}
//         onChange={(e: any) => setAmount(e.target.value)}
//         placeholder="Enter amount in ₹"
//       />
//       <Button onClick={handlePayment}>Pay </Button>
//     </div>
//   );
// };

// export default PaymentRazorPay;

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const PaymentRazorPay = () => {
  const [amount, setAmount] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!scriptLoaded) {
      alert("Razorpay SDK is not ready yet!");
      return;
    }

    const data = { amount: amount };
    const response = await fetch("/api/orders/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    const result = res.order
    console.log(result);

    const options = {
      key: process.env.RAZORPAY_KEY_ID, // Moved to public env variable
      amount: result.amount,
      currency: result.currency,
      name: "Your Company Name",
      description: "Test Transaction",
      order_id: result.id,
      handler: function (response: any) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "note value",
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log(options);
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="flex gap-4">
      <Input
        type="number"
        value={amount}
        onChange={(e: any) => setAmount(Number(e.target.value))}
        placeholder="Enter amount in ₹"
      />
      <Button onClick={handlePayment} disabled={!scriptLoaded}>
        Pay
      </Button>
    </div>
  );
};

export default PaymentRazorPay;
