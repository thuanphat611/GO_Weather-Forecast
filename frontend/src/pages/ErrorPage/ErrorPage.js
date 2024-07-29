import classNames from "classnames/bind";
import styles from './ErrorPage.module.scss';
import { BsEmojiFrownFill } from "react-icons/bs";

const cx = classNames.bind(styles);

function ErrorPage() {
  return (
    <div className={cx('content')}>
      <div className={cx('header')}>
        <h2 className={cx('header-text')}>GO Weather Forecast</h2>
      </div>
      
      <div className={cx('body')}>
        <div className={cx('icon')}>
          <BsEmojiFrownFill />
        </div>

        <h4 className={cx('text')}>Something wrong happended</h4>
      </div>
    </div>
  );
}

export default ErrorPage;