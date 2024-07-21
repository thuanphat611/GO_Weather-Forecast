import classNames from "classnames/bind";
import styles from './EmailSubscription.module.scss';
import { FaEnvelope } from "react-icons/fa6";
import { useState } from "react";
import { toast } from 'react-toastify';

import { postRegisterEmail, postUnsubscribeEmail } from "../../api/weatherApi";

const cx = classNames.bind(styles);

function EmailSubScription() {
  const [email, setEmail] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const registerText = 'Subscribe to receive daily weather forecast information directly in your inbox. Our service will keep you informed about the upcoming weather conditions, so you’re always prepared for what’s ahead. Sign up today and never miss an important weather update!';
  const unsubscribeText = 'Enter your registered email below to unsubscribe.'
  const registerTitle = 'Receive weather forecast information via email';
  const unsubscribeTitle = 'Unsubscribe from weather updates';

  const handleSubmit = async () => {
    if (email.length === 0) {
      return;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email.');
      return;
    }

    let result = {};
    if (isRegister) {
      result = await postRegisterEmail(email);
    }
    else {
      result = await postUnsubscribeEmail(email);
    }
    
    if (result.success) {
      toast.info('A confirmation email has been sent to your address. Please check your inbox and follow the instructions to complete your subscription.', { autoClose :10000});
    } else {
      toast.error(result.message || 'Some error occured, please try again');
    }
    setEmail('');
  }

  return (
    <div className={cx('subscription')}>
      <div className={cx('subscription-img')}>
        <FaEnvelope />
      </div>
      <div className={cx('subscription-content')}>
        <h3 className={cx('subscription-title')}>{isRegister ? registerTitle : unsubscribeTitle}</h3>
        <p className={cx('subscription-text')}>{isRegister ? registerText : unsubscribeText}</p>
        <form className={cx('subscription-form')}>
          <input type='text' className={cx('subscription-input')} autoComplete='off' placeholder='Enter your email here'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button className={cx('subscription-btn')}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
          {
            isRegister ?
            'Notify Me'
            :
            'Unsubscribe'
          }
          </button>
        </form>
        <button className={cx('toggle-btn')}
          onClick={(e) => {
            e.preventDefault();
            setIsRegister(value => !value)
          }}
        >
          {
            isRegister ?
            'I want to unsubscribe'
            :
            'Register for information'
          }
        </button>
      </div>
    </div>
  );
}

export default EmailSubScription;