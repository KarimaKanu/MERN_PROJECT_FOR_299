import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import Counselor from '../models/counselor.model.js';
import appointmentModel from '../models/appointModel.js';
import stripe from "stripe";
import razorpay from 'razorpay';


export const test = (req, res) =>
{
    res.json({
        message: 'api is working',
    })
};
// delete user

export const deleteUser = async (req, res, next) => {
    
    console.log(req.user.id, req.user.id === req.params.id);
    
    if (req.user.id !== req.params.id) {
         console.log(req.user.id, req.user.id === req.params.id);
      return next(errorHandler(401, 'You can delete only your account!'));
    }

    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json('User has been deleted...');
    } catch (error) {
        console.log(error);
        // next(error);
    }
  //.clearCookie('access_token')
  };

  
  export const updateUser = async (req, res, next) => {
    console.log(req.user.id, req.user.id === req.params.id);
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const getAllCounselor= async (req, res) => {
    try {
      const counselors = await Counselor.find({ status: "approved" });
      res.status(200).send({
        success: true,
        message: "Counselor Lists Fetched Successfully",
        data: counselors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error WHile Fetching Counselors",
      });
    }
  };


  const bookAppointment = async (req, res) => {

    try {

        const { userId, counselorId, slotDate, slotTime } = req.body
        const docData = await Counselor.findById(counselorId).select("-password")

        if (!docData.available) {
            return res.json({ success: false, message: 'Counselor Not Available' })
        }

        let slots_booked = docData.slots_booked;

        // checking for slot availability 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await User.findById(userId).select("-password")

        delete docData.slots_booked;

        const appointmentData = {
            userId,
            counselorId,
            userData,
            docData,
            amount: docData.feesPerConsultation,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await Counselor.findByIdAndUpdate(counselorId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const listAppointment = async (req, res) => {
  try {

      const { userId } = req.body
      const appointments = await appointmentModel.find({ userId })

      res.json({ success: true, appointments })

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }
}
  
const cancelAppointment = async (req, res) => {
  try {

      const { userId, appointmentId } = req.body
      const appointmentData = await appointmentModel.findById(appointmentId)

      // verify appointment user 
      if (appointmentData.userId !== userId) {
          return res.json({ success: false, message: 'Unauthorized action' })
      }

      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

      // releasing doctor slot 
      const { counselorId, slotDate, slotTime } = appointmentData

      const doctorData = await Counselor.findById(counselorId)
      if (!doctorData) {
        return res.json({ success: false, message: "Doctor not found" });
    }

      let slots_booked = doctorData.slots_booked;

      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

      await Counselor.findByIdAndUpdate(counselorId, { slots_booked })

      res.json({ success: true, message: 'Appointment Cancelled' })

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }
}

const paymentRazorpay = async (req, res) => {
  try {

      const { appointmentId } = req.body
      const appointmentData = await appointmentModel.findById(appointmentId)

      if (!appointmentData || appointmentData.cancelled) {
          return res.json({ success: false, message: 'Appointment Cancelled or not found' })
      }

      // creating options for razorpay payment
      const options = {
          amount: appointmentData.amount * 100,
          currency: process.env.CURRENCY,
          receipt: appointmentId,
      }

      // creation of an order
      const order = await razorpayInstance.orders.create(options)

      res.json({ success: true, order })

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }
}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
      const { razorpay_order_id } = req.body
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

      if (orderInfo.status === 'paid') {
          await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
          res.json({ success: true, message: "Payment Successful" })
      }
      else {
          res.json({ success: false, message: 'Payment Failed' })
      }
  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }
}

// API to make payment of appointment using Stripe
const paymentStripe = async (req, res) => {
  try {

      const { appointmentId } = req.body
      const { origin } = req.headers

      const appointmentData = await appointmentModel.findById(appointmentId)

      if (!appointmentData || appointmentData.cancelled) {
          return res.json({ success: false, message: 'Appointment Cancelled or not found' })
      }

      const currency = process.env.CURRENCY.toLocaleLowerCase()

      const line_items = [{
          price_data: {
              currency,
              product_data: {
                  name: "Appointment Fees"
              },
              unit_amount: appointmentData.amount * 100
          },
          quantity: 1
      }]

      const session = await stripeInstance.checkout.sessions.create({
          success_url: `${origin}/verify?success=true&appointmentId=${appointmentData._id}`,
          cancel_url: `${origin}/verify?success=false&appointmentId=${appointmentData._id}`,
          line_items: line_items,
          mode: 'payment',
      })

      res.json({ success: true, session_url: session.url });

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }
}

const verifyStripe = async (req, res) => {
  try {

      const { appointmentId, success } = req.body

      if (success === "true") {
          await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
          return res.json({ success: true, message: 'Payment Successful' })
      }

      res.json({ success: false, message: 'Payment Failed' })

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }

}

  export { bookAppointment, listAppointment, cancelAppointment, verifyStripe, paymentStripe, verifyRazorpay, paymentRazorpay}