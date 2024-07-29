import classNames from "classnames/bind";
import styles from './LimitPage.module.scss';
import { BiSolidError } from "react-icons/bi";

const cx = classNames.bind(styles);

function LimitPage() {
  console.log('I\'m poor sorry')
  return (
    <div className={cx('content')}>
      <div className={cx('header')}>
        <h2 className={cx('header-text')}>GO Weather Forecast</h2>
      </div>
      
      <div className={cx('body')}>
        <div className={cx('icon')}>
          <BiSolidError />
        </div>

        <h4 className={cx('text')}>Backend exceeded daily API request limit of Weatherbit free plan ❌ <br/>See you tomorrow</h4>
      </div>
    </div>
  );
}

export default LimitPage;