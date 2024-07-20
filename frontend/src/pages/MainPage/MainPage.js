import classNames from 'classnames/bind';
import { FaMagnifyingGlass, FaEnvelope } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import styles from './MainPage.module.scss';

const cx = classNames.bind(styles);

function MainPage() {
  return (
    <div className={cx('content')}>
      <div className={cx('header')}>
        <h2 className={cx('header-text')}>GO Weather Forecast</h2>
      </div>

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
          <div className={cx('four-day')}>
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
          </div>

          <div className={cx('subscription')}>
            <div className={cx('subscription-img')}>
              <FaEnvelope />
            </div>
            <div className={cx('subscription-content')}>
              <h3 className={cx('subscription-title')}>Receive weather forecast information via email</h3>
              <p className={cx('subscription-text')}>Subscribe to receive daily weather forecast information directly in your inbox. Our service will keep you informed about the upcoming weather conditions, so you’re always prepared for what’s ahead. Sign up today and never miss an important weather update!</p>
              <form className={cx('subscription-form')}>
                <input type='email' className={cx('subscription-input')} placeholder='Enter your email here'/>
                <button className={cx('subscription-btn')}>Notify Me</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;