import classNames from "classnames/bind";
import styles from './LoadingAnimation.module.scss';

import loading from '../../assests/loading.gif';

const cx = classNames.bind(styles);

function LoadingAnimation({ isLoading }) {
  return (
    <div className={cx('overlay', {'no-display': !isLoading})}>
      <img className={cx('gif')} src={loading} alt='loading'/>
      <h3 className={cx('text')}>Loading, please wait...</h3>
    </div>
  );
}

export default LoadingAnimation;