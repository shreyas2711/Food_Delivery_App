import React, { useEffect, useState } from 'react';
import './MyOrders.css';
// import '../components/MainSection.css'
import NavigationBar from '../components/NavigationBar';
import { orderHeader, RemoveButton } from '../utils/styles';
import axios from 'axios';
import { styled } from '@mui/system';
import useRazorpay from "react-razorpay";


const PlaceOrderButton = styled('button')({

  padding:'1rem 20rem 1rem 21rem',
  borderRadius:'21px'
,
})

function MyOrders() {
  const RAZORPAY_KEY_ID = 'rzp_test_2Q9vl4rExNYOIC';
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBill,setTotalBill] = useState(null);

  const [Razorpay] = useRazorpay();
  useEffect(() => {
    const getOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('/api/order/show',
          { 
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            withCredentials: true
          });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        console.log("this is orders:", data.data.rows);
        setOrders(data.data.rows);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getOrders();
  }, []);

    console.log("orders:::",orders);

  useEffect(() => {
  const getBillingAmount = async () => {  // Use correct async arrow function syntax
    try {
      const getTotalBill = await axios.get(`/api/order/showbill`);
      const result = getTotalBill.data.operation.rows[0].total;
      const billtotal = Math.round(result * 100);  // Multiply result by 100 before rounding
      setTotalBill(billtotal);
    } catch (error) {
      console.error("Error fetching billing amount:", error);
    }
  };

  getBillingAmount();  // Call the async function

}, [orders]);  // Depend on 'orders'

    console.log("ttttt;",totalBill);
    
  const handlePayment = async (PayValue) => {
    try {
      const token = localStorage.getItem('token');
  
      // Send the POST request
      // const amount = {
      //   amount_pay:1000
      // }
    
      const response = await axios.post(`/api/payment/order`,{amount:PayValue},{
         // Pass an empty object for the body if not needed
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          withCredentials: true
  
    });
  
      // Access the parsed JSON data directly from response.data
      const order = response.data;
   
      console.log("Order:", order);
      console.log("resp:", response);
  
      // Set up Razorpay options with the received order details
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Shreyas", // Your company details
        description: "Payment for your order", // Add order details
        order_id: order.id, // Razorpay order ID
  
        handler: async (response) => {
          try {
            await axios.post(`${baseUrl}/api/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount:order.amount,
            }, {                   
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              withCredentials: true
            });
  
            alert("Payment successful!");
            window.location.reload();
          } catch (err) {
            alert("Payment failed: " + err.message);
          }
        },
  
        prefill: {
          name: "Shreyas Kamath", // Customer details
          email: "shreyas.kamath27@gmail.com", // Customer email
          contact: "9611622445", // Customer contact
        },
  
        theme: {
          color: "#3399cc", // Customize the payment gateway color
        },
      };
  
      // Open Razorpay payment window
      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (err) {
      alert("Error creating order: " + err.message);
    }
  };

  const handleDeleteOrder =async(order_id) =>{

    try{
    const { data } = await axios.delete(`/api/order/delete?order_id=${order_id}`);
    setOrders(prevOrders => prevOrders.filter(order => order.order_id !== order_id));
    console.log("orderid from frontend:",order_id);

  }
  catch(error){
    console.error(error);
  }
  };

  console.log("orders:", orders);

  return (
    <>
      <NavigationBar />
      <div className="main-container"> 
        <h1>Your orders</h1>
        <hr />
        {loading && <p>Loading orders...</p>}
        {error && <p>Error fetching orders: {error}</p>}
        {!loading && !error && orders.length === 0 && <p>No orders found.</p>}
        {orders.map((order, index) => (
          <div className="order-card" key={index}>
            <div className="card-col-1">
              <img width={100} height={100} src={order.img_food} alt={order.food_name} />
            </div>
            <div className="card-col-2" style={{marginTop:'-9px'}}>
              <div>
              <p style={{...orderHeader,marginBottom:'0rem'}}>{order.food_name}</p>
              </div>
              <div style={{marginBottom:'1rem'}}>
              <strong>₹{order.order_total}</strong>
              </div>
              <div className="remove-button">
                <button style={RemoveButton} onClick={()=>handleDeleteOrder(order.order_id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',justifyContent:'center',marginTop:'3rem'}}>
          <PlaceOrderButton onClick={()=>handlePayment(totalBill)}>
            Place order
          </PlaceOrderButton>
        </div>
    </>
  );
}

export default MyOrders;
