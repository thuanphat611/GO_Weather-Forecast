import classNames from "classnames/bind";
import styles from './VerifyPage.module.scss';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsEmojiFrownFill } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";

import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { postRegisterVerification, postUnsubscribeVerification } from "../../api/weatherApi";

const cx = classNames.bind(styles);

function VerifyPage() {
  const { type, token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('Some error occured, please try again.');

  useEffect(()  => {
    const getData = async () => {
      setIsLoading(true)
      let result = {};

      if (type === 'register') {
        result = await postRegisterVerification(token);
      } else if (type === 'unsubscribe') {
        result = await postUnsubscribeVerification(token);
      }
      else {
        return;
      }
      
      setSuccess(result?.success);
      setMessage(result?.message);

      setIsLoading(false);
    }
    getData();
  }, [type, token]);

  return (
    <div className={cx('content')}>
      <div className={cx('header')}>
        <h2 className={cx('header-text')}>GO Weather Forecast</h2>
      </div>

      <LoadingAnimation isLoading={isLoading} setIsLoading={setIsLoading}/>
      <div className={cx('body')}>
        <div className={cx('icon')}>
          {
            success ?
            <MdMarkEmailRead />
            :
            <BsEmojiFrownFill />
          }
        </div>

        <h4 className={cx('text')}>{message}</h4>
        <Link className={cx('to-home')} to='/'>Back to homepage</Link>
      </div>
    </div>
  );
}

export default VerifyPage;