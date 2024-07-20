import classNames from 'classnames/bind';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import styles from './MainPage.module.scss';

import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';
import FourDayInfo from '../../components/FourDayInfo/FourDayInfo';
import EmailSubScription from '../../components/EmailSubscription/EmailSubscription';

const cx = classNames.bind(styles);

function MainPage() {
  return (
    <div className={cx('content')}>
      <div className={cx('header')}>
        <h2 className={cx('header-text')}>GO Weather Forecast</h2>
      </div>

      <LoadingAnimation />
      <div className={cx('body')}>
        <div className={cx('main-info')}>
          <div className={cx('search')}>
            <input type='text' className={cx('search-input')} placeholder='E.g., New York, London'/>
            <button className={cx('search-btn')}>
              <FaMagnifyingGlass />
            </button>
          </div>

          <div className={cx('weather')}>
            <img className={cx('weather-icon')} src='https://cdn.weatherapi.com/weather/64x64/day/116.png' alt=''/>
            <div className={cx('weather-temp')}>
              <h1 className={cx('weather-temp-degree')}>31</h1>
              <h4 className={cx('weather-temp-unit')}>C</h4>
            </div>
            <h4 className={cx('weather-info')}>Partly cloudy</h4>
            <span className={cx('seperate')}></span>
            <h3 className={cx('weather-date')}>2024-07-20</h3>
            <h4 className={cx('weather-text')}>Temperature: 31&deg;C</h4>
            <h4 className={cx('weather-text')}>Wind: 31M/S</h4>
            <h4 className={cx('weather-text')}>Humidity: 76%</h4>
            <h1 className={cx('weather-location')}>London</h1>
          </div>

          <button className={cx('history')}>
            <div className={cx('history-icon')}>
              <FaHistory />
            </div>
            <h4 className={cx('history-text')}>History</h4>
          </button>
        </div>

        <div className={cx('options')}>
          {/* <div className={cx('four-day')}>
            <h3 className={cx('four-day-title')}>4-Day Forecast</h3>
            <ul className={cx('four-day-list')}>
              <li className={cx('four-day-item')}>
                <h4 className={cx('four-day-date')}>2024-07-21</h4>
                <img className={cx('four-day-icon')} src='https://cdn.weatherapi.com/weather/64x64/day/116.png' alt='' />
                <h4 className={cx('four-day-text')}>Temperature: 31&deg;C</h4>
                <h4 className={cx('four-day-text')}>Wind: 31M/S</h4>
                <h4 className={cx('four-day-text')}>Humidity: 76%</h4>
              </li>
              <li className={cx('four-day-item')}>
                <h4 className={cx('four-day-date')}>2024-07-21</h4>
                <img className={cx('four-day-icon')} src='https://cdn.weatherapi.com/weather/64x64/day/116.png' alt='' />
                <h4 className={cx('four-day-text')}>Temperature: 31&deg;C</h4>
                <h4 className={cx('four-day-text')}>Wind: 31M/S</h4>
                <h4 className={cx('four-day-text')}>Humidity: 76%</h4>
              </li>
              <li className={cx('four-day-item')}>
                <h4 className={cx('four-day-date')}>2024-07-21</h4>
                <img className={cx('four-day-icon')} src='https://cdn.weatherapi.com/weather/64x64/day/116.png' alt='' />
                <h4 className={cx('four-day-text')}>Temperature: 31&deg;C</h4>
                <h4 className={cx('four-day-text')}>Wind: 31M/S</h4>
                <h4 className={cx('four-day-text')}>Humidity: 76%</h4>
              </li>
              <li className={cx('four-day-item')}>
                <h4 className={cx('four-day-date')}>2024-07-21</h4>
                <img className={cx('four-day-icon')} src='https://cdn.weatherapi.com/weather/64x64/day/116.png' alt='' />
                <h4 className={cx('four-day-text')}>Temperature: 31&deg;C</h4>
                <h4 className={cx('four-day-text')}>Wind: 31M/S</h4>
                <h4 className={cx('four-day-text')}>Humidity: 76%</h4>
              </li>
            </ul>
            <button className={cx('four-day-more')}>Load more</button>
          </div> */}
          <FourDayInfo />

          <EmailSubScription />
        </div>
      </div>
    </div>
  );
}

export default MainPage;