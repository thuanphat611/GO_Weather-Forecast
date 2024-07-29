import classNames from "classnames/bind";
import styles from './FutureInfo.module.scss';

const cx = classNames.bind(styles);

function FutureInfo({ data, showMore, setShowMore }) {

  return (
    <div className={cx('four-day')}>
      <h3 className={cx('four-day-title')}>3-Day Forecast</h3>
      <ul className={cx('four-day-list')}>
        {
          //Check if data is loaded and display it
          data ?
          data.filter((item, index) => index < 3).map((data, index) => {
            return (
            <li key={index} className={cx('four-day-item')}>
              <div>
                <h4 className={cx('four-day-date')}>{data.date}</h4>
                <img className={cx('four-day-icon')} src={data.icon} alt='' />
              </div>
              <div>
                <h4 className={cx('four-day-text')}>Temperature: {data.temp}&deg;C</h4>
                <h4 className={cx('four-day-text')}>Wind: {data.wind} M/S</h4>
                <h4 className={cx('four-day-text')}>Humidity: {data.humid}%</h4>
              </div>
            </li>
          )})
          :
          <p>No data</p>
        }
      </ul>
      {
        showMore ?
        (
          <ul className={cx('four-day-list')}>
            {
              data.filter((item, index) => index >= 3 && index < 6).map((data, index) => {
                return (
                <li key={index} className={cx('four-day-item')}>
                  <div>
                    <h4 className={cx('four-day-date')}>{data.date}</h4>
                    <img className={cx('four-day-icon')} src={data.icon} alt='' />
                  </div>
                  <div>
                    <h4 className={cx('four-day-text')}>Temperature: {data.temp}&deg;C</h4>
                    <h4 className={cx('four-day-text')}>Wind: {data.wind} M/S</h4>
                    <h4 className={cx('four-day-text')}>Humidity: {data.humid}%</h4>
                  </div>
                </li>
              )})
            }
          </ul>
        )
        :
        null
      }
      {
        
        data ?
        <button className={cx('four-day-more')}
          onClick={() => {
            setShowMore(value => !value);
          }}
        >
          {showMore ? 'Show less' : 'Load more'}
        </button>
        :
        null //Hidden when there's no data
      }
    </div>
  );
}

export default FutureInfo;