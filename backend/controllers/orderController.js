const uuid = require('uuid');
const Razorpay = require("razorpay");

exports.GetOrders = (db)=>async(req,res,next)=>{

    try{
        const user_id = req.user.rows[0].user_id;
        console.log("thisssss is ->>>>>>user_id:",user_id);
        const data = await db.query('SELECT * FROM orders where user_id=$1',[user_id]);

        res.status(200).json({
            data
        })
    }
    catch(error){
        console.error('Error retriveing menu!',error);
        res.status(500).json({
            error:'Internal server error'
        })
       }
};


exports.CreateOrder = (db) => async (req, res, next) => {
    try {
      const user_id = req.user.rows[0].user_id;
      const order_id = uuid.v4();
      const restraunt_id = "06d7e217-41f8-4e23-9497-0077ade6d478";
      const del_status = "On the way"
      const driver_id = "c3c10a48-4235-4c84-87d4-8fefd36d0122"
      const food_name = req.body.item;
      const quantity = req.body.quantity;
      const food_size = req.body.selectedOptionDropdown2;
      const price = req.body.price;
      const order_total = price*quantity;
      const img_food = req.body.img_food;
      // console.log("item from action:", item);
      
      const data = await db.query('INSERT INTO orders(order_id,user_id,restraunt_id,order_total,delivery_status,driver_id,quantity,food_size,img_food,food_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[order_id,user_id,restraunt_id,order_total,del_status,driver_id,quantity,food_size,img_food,food_name]);

      // console.log("size action:", size);

      res.status(200).json({
        success:true,
        message:'Order created successfully!',
        data

      })
      // const data = await db.query('INSERT INTO orders()')
  
    } catch (error) {
      console.log(error);
    }
  };


  exports.DeleteOrder = (db)=>async(req,res,next)=>{

      try{
        const order_id = req.query.order_id;
        console.log("orderId:",order_id);
        const data = await db.query('DELETE FROM orders WHERE order_id=$1',[order_id]);
        
      res.status(200).json({
        success:true,
        message:'Order deleted successfully!',

      })
      }
      catch(error){
        console.error('Error deleting order!',error);
        res.status(500).json({
            error:'Internal server error'
        })
       }
  }
  
  exports.getTotalBillForOrder = (db)=>async(req,res)=>{

    try{

      const operation = await db.query('SELECT SUM (order_total) AS total from orders');
      res.status(200).json({
        operation,
      })
    }
    catch(error){
      console.error('Error deleting order!',error);
      res.status(500).json({
          error:'Internal server error'
      })
     }
  }

  exports.createPaymentOrder = (db)=>async(req,res)=>{


    console.log('keyyy:',process.env.RAZORPAY_KEY_ID);
    try {
        const {amount} = req.body;
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const options = {
            amount: amount, 
            currency: "INR",
            receipt: 'receipt_' + Math.random().toString(36).substring(7),
        };
        const order = await instance.orders.create(options);  
        console.log("order:",order);
        if (!order) return res.status(500).send("Some error occured"); 
       
        res.status(200).json(order);
       
}                          
catch (error) {
    res.status(500).send(error);
}
}


exports.verifyPaymentOrder =(db)=>async (req,res)=>{
  console.log("Verify order:");
  
  try{
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature,amount } = req.body;
      const user_id = req.user.rows[0].user_id;
      console.log("user_id:",user_id);
      console.log("razorpay_order_id:",razorpay_order_id); 
      console.log("razorpay_payment_id:",razorpay_payment_id); 
      console.log("razorpay_signature:",razorpay_signature); 
      console.log("amount_paid:",amount); 
      const sign = razorpay_order_id + '|' + razorpay_payment_id;
      console.log("sign:",sign);
      const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(sign.toString()).digest('hex'); 
          console.log("razorpay_signature:",razorpay_signature);
          console.log("expectedSign:",expectedSign);
          if (razorpay_signature === expectedSign) {
              // Payment is verified
              console.log("Payment verified successfully")
              res.status(200).json({ message: 'Payment verified successfully' });
              // switch (amount) {
              //     case 9900:
              //         const response1 = await db.query('UPDATE users SET user_credit = user_credit + 10 WHERE user_id=$1',[user_id]);
              //         break;
              //     case 19900:
              //         const response2 = await db.query('UPDATE users SET user_credit = user_credit + 20 WHERE user_id=$1',[user_id]);
              //         break;
              //     case 29900:
              //         const response3 = await db.query('UPDATE users SET user_credit = user_credit + 30 WHERE user_id=$1',[user_id]);
              //         break;
              //     default:
              //         break;
              // }
          } else {
              console.log("Invalid payment signature")
              res.status(400).json({ error: 'Invalid payment signature' });
          }
  }
  catch (err) {
      res.status(500).json({ error: err.message });
  }
}