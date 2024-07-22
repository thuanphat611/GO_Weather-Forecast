const crypto = require('crypto');
const Subscription = require('../models/subscription');
const nodemailer = require('nodemailer');
require('dotenv').config(); 

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD
  }
});

// Function to send verification email
async function sendConfirmationEmail(userEmail, type, token) {
  const confirmationLink = `https://${process.env.FRONTEND_URL}/verify/${type}/${token}`;
  const verifyType = type === 'register' ? 'Subscription' : 'Unsubscription';
  const htmlContent = `
    <p style="font-size: 18px;">Please confirm your ${verifyType} by clicking the following link:</p>
    <p style="font-size: 18px;">
      <a href="${confirmationLink}" style="
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        color: #ffffff;
        background-color: #5372f0;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
      ">Confirm ${verifyType}</a>
    </p>
    <p style="font-size: 18px;">
      If the above don't work, go to this site, instead:<br>
      <a href="${confirmationLink}" style="
        color: #5372f0;
        text-decoration: underline;
      ">${confirmationLink}</a>
    </p>
  `;

  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: userEmail,
    subject: 'GO Weather Forecast - Confirm Your ' + verifyType,
    html:  htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

// Controller handle register
const registerSubscription = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({success: false, message: 'Email is required.'});
  }

  try {
    // Check if email exists in database
    let subscription = await Subscription.findOne({ email });

    if (subscription) {
      if (subscription.isVerified) {
        return res.status(400).json({success: false, message: 'Subscription email already exists.'});
      }
      else {
        //Resend verification token
        await sendConfirmationEmail(subscription.email, 'register', subscription.verifyToken);
        return res.status(201).json({success: true, message: 'Subscription registered. Please check your email to confirm.'});
      }
    }

    // Create new document
    subscription = new Subscription({ email });
    await subscription.save();

    // Send verification email
    await sendConfirmationEmail(subscription.email, 'register', subscription.verifyToken);

    res.status(201).json({success: true, message: 'Subscription registered. Please check your email to confirm.'});
  } catch (err) {
    console.error('Error registering subscription:', err);
    res.status(500).json({success: false, message: 'Internal server error.'});
  }
}

const verifyEmail = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({success: false, message: 'Token is required.'});
  }

  try {
    // find document by verifyToken
    const subscription = await Subscription.findOne({ verifyToken: token });

    if (!subscription) {
      return res.status(400).json({success: false, message: 'Invalid or expired token.'});
    }

    // update isVerified to true
    subscription.isVerified = true;
    subscription.verifyToken = null; // Delete to token after verification
    await subscription.save();

    res.status(200).json({success: true, message: 'Email verified successfully.'});
  } catch (err) {
    console.error('Error verifying email:', err);
    res.status(500).json({success: false, message: 'Internal server error.'});
  }
}

// Controller to handle email unsubscription requests
const unsubscribeEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({success: false, message: 'Email is required.'});
  }

  try {
    // Find subscription with email and isVerified = tru
    const subscription = await Subscription.findOne({ email, isVerified: true });

    if (!subscription) {
      return res.status(404).json({success: false, message: 'No verified subscription found for this email.'});
    }

    // Generate a new unsubscription token and send email
    subscription.unsubscribeToken = crypto.randomBytes(20).toString('hex');
    await subscription.save();

    await sendConfirmationEmail(subscription.email, 'unsubscribe', subscription.unsubscribeToken);

    res.status(200).json({success: true, message: 'Unsubscribe request received. Please check your email to confirm.'});
  } catch (err) {
    console.error('Error processing unsubscription:', err);
    res.status(500).json({success: false, message: 'Internal server error.'});
  }
}

const confirmUnsubscription = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({success: false, message: 'Token is required.'});
  }

  try {
    // Find subscription based on the unsubscription token
    const subscription = await Subscription.findOne({ unsubscribeToken: token });

    if (!subscription) {
      return res.status(400).json({success: false, message: 'Invalid or expired token.'});
    }

    // Remove the subscription
    await Subscription.deleteOne({ _id: subscription._id });

    res.status(200).json({success: true, message: 'Subscription successfully unsubscribed.'});
  } catch (err) {
    console.error('Error confirming unsubscription:', err);
    res.status(500).json({success: false, message: 'Internal server error.'});
  }
}

module.exports = { registerSubscription, verifyEmail, unsubscribeEmail, confirmUnsubscription };