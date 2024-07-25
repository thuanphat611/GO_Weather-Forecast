import classNames from "classnames/bind";
import styles from './NotFoundPage.module.scss';
import { FaLinkSlash } from "react-icons/fa6";

const cx = classNames.bind(styles);

function ErrorPage() {
  return (
    <div className={cx('content')}>
      <div className={cx('header')}>
        <h2 className={cx('header-text')}>GO Weather Forecast</h2>
      </div>
      
      <div className={cx('body')}>
        <div className={cx('icon')}>
          <FaLinkSlash />
        </div>

        <h4 className={cx('text')}>The page you are looking for does not exist<br/> Please check the URL and try again</h4>
      </div>
    </div>
  );
}

export default ErrorPage;