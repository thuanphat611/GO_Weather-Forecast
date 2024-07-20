import classNames from "classnames/bind";
import styles from './FourDayInfo.module.scss';

const cx = classNames.bind(styles);

function FourDayInfo({ data }) {
  return (
    <div className={cx('four-day')}>
      <h3 className={cx('four-day-title')}>4-Day Forecast</h3>
      <ul className={cx('four-day-list')}>
        {
          //Check if data is loaded and display it
          data ?
          <li className={cx('four-day-item')}>
            <h4 className={cx('four-day-date')}>{data.date}</h4>
            <img className={cx('four-day-icon')} src={data.icon} alt='' />
            <h4 className={cx('four-day-text')}>Temperature: {data.temp}&deg;C</h4>
            <h4 className={cx('four-day-text')}>Wind: {data.wind} M/S</h4>
            <h4 className={cx('four-day-text')}>Humidity: {data.humid}%</h4>
          </li>
          :
          <p>No data</p>
        }
      </ul>
      {
        //Hidden when there's no data
        data ?
        <button className={cx('four-day-more')}>Load more</button>
        :
        null
      }
    </div>
  );
}

export default FourDayInfo;