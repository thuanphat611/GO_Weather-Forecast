const crypto = require('crypto');
const Subscription = require('../models/subscription');
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // Hoặc dịch vụ email của bạn
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-email-password'
//   }
// });

// Hàm gửi email xác nhận
// async function sendConfirmationEmail(userEmail, token) {
//   const confirmationLink = `https://yourdomain.com/confirm?token=${token}`;

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: userEmail,
//     subject: 'Confirm Your Subscription',
//     text: `Please confirm your subscription by clicking the following link: ${confirmationLink}`,
//     html: `<p>Please confirm your subscription by clicking the following link:</p><a href="${confirmationLink}">Confirm Subscription</a>`
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Confirmation email sent');
//   } catch (error) {
//     console.error('Error sending confirmation email:', error);
//   }
// }

// Controller handle register
const registerSubscription = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({success: false, message: 'Email is required'});
  }

  try {
    // Check if email exists in database
    let subscription = await Subscription.findOne({ email });

    if (subscription) {
      if (subscription.isVerified) {
        return res.status(400).json({success: false, message: 'Subscription already exists'});
      }
      else {
        //Resend verification token
        // await sendConfirmationEmail(subscription.email, subscription.verifyToken);
        return res.status(201).json({success: true, message: 'Subscription registered. Please check your email to confirm.'});
      }
    }

    // Create new document
    subscription = new Subscription({ email });
    await subscription.save();

    // Send verification email
    // await sendConfirmationEmail(subscription.email, subscription.verifyToken);

    res.status(201).json({success: true, message: 'Subscription registered. Please check your email to confirm.'});
  } catch (error) {
    console.error('Error registering subscription:', error);
    res.status(500).json({success: false, message: 'Internal server error'});
  }
}

const verifyEmail = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({success: false, message: 'Token is required'});
  }

  try {
    // find document by verifyToken
    const subscription = await Subscription.findOne({ verifyToken: token });

    if (!subscription) {
      return res.status(400).json({success: false, message: 'Invalid or expired token'});
    }

    // update isVerified to true
    subscription.isVerified = true;
    subscription.verifyToken = null; // Delete to token after verification
    await subscription.save();

    res.status(200).json({success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({success: false, message: 'Internal server error' });
  }
}

// Controller to handle email unsubscription requests
const unsubscribeEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({success: false, message: 'Email is required'});
  }

  try {
    // Find subscription with email and isVerified = tru
    const subscription = await Subscription.findOne({ email, isVerified: true });

    if (!subscription) {
      return res.status(404).json({success: false, message: 'No verified subscription found for this email'});
    }

     // Generate a new unsubscription token and send email
    subscription.unsubscribeToken = crypto.randomBytes(20).toString('hex');
    await subscription.save();

    // await sendUnsubscribeConfirmationEmail(subscription.email, subscription.unsubscribeToken);

    res.status(200).json({success: true, message: 'Unsubscribe request received. Please check your email to confirm.'});
  } catch (error) {
    console.error('Error processing unsubscription:', error);
    res.status(500).json({success: false, message: 'Internal server error'});
  }
}

const confirmUnsubscription = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({success: false, message: 'Token is required'});
  }

  try {
    // Find subscription based on the unsubscription token
    const subscription = await Subscription.findOne({ unsubscribeToken: token });

    if (!subscription) {
      return res.status(400).json({success: false, message: 'Invalid or expired token'});
    }

    // Remove the subscription
    await Subscription.deleteOne({ _id: subscription._id });

    res.status(200).json({success: true, message: 'Subscription successfully unsubscribed'});
  } catch (error) {
    console.error('Error confirming unsubscription:', error);
    res.status(500).json({success: false, message: 'Internal server error'});
  }
}

module.exports = { registerSubscription, verifyEmail, unsubscribeEmail, confirmUnsubscription };