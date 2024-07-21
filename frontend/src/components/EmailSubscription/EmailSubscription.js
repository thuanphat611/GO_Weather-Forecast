import classNames from "classnames/bind";
import styles from './EmailSubscription.module.scss';
import { FaEnvelope } from "react-icons/fa6";

const cx = classNames.bind(styles);

function EmailSubScription() {
  return (
    <div className={cx('subscription')}>
      <div className={cx('subscription-img')}>
        <FaEnvelope />
      </div>
      <div className={cx('subscription-content')}>
        <h3 className={cx('subscription-title')}>Receive weather forecast information via email</h3>
        <p className={cx('subscription-text')}>Subscribe to receive daily weather forecast information directly in your inbox. Our service will keep you informed about the upcoming weather conditions, so you’re always prepared for what’s ahead. Sign up today and never miss an important weather update!</p>
        <form className={cx('subscription-form')}>
          <input type='email' className={cx('subscription-input')}  autocomplete='off' placeholder='Enter your email here'/>
          <button className={cx('subscription-btn')}>Notify Me</button>
        </form>
      </div>
    </div>
  );
}

export default EmailSubScription;