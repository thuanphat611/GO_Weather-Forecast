import classNames from "classnames/bind";
import styles from './LoadingAnimation.module.scss';

import loading from '../../assets/loading.gif';

const cx = classNames.bind(styles);

function LoadingAnimation({ isLoading }) {
  return (
    // if isLoading = true, this component is displayed
    <div className={cx('overlay', {'display': isLoading})}>
      <img className={cx('gif')} src={loading} alt='loading'/>
      <h3 className={cx('text')}>Loading, please wait...</h3>
    </div>
  );
}

export default LoadingAnimation;