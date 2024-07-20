import classNames from 'classnames/bind';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import styles from './MainPage.module.scss';

import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';
import FourDayInfo from '../../components/FourDayInfo/FourDayInfo';
import EmailSubScription from '../../components/EmailSubscription/EmailSubscription';

const cx = classNames.bind(styles);

function MainPage() {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Set isLoading to true while fetching data from the server to show the loading animation
  const [historyDisplay, setHistoryDisplay] = useState(false);
 
  return (
    <div className={cx('content')}>
      <div className={cx('header')}>
        <h2 className={cx('header-text')}>GO Weather Forecast</h2>
      </div>

      <LoadingAnimation isLoading={isLoading} />
      <div className={cx('body')}>
        <div className={cx('main-info')}>
          <div className={cx('search')}>
            <input type='text' className={cx('search-input')} placeholder='E.g., New York, London'
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
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
            <h4 className={cx('history-text')}
              onClick={() => {
                setHistoryDisplay(true);
              }}
            >
              History
            </h4>
          </button>

          <div className={cx('history-overlay', {'display-flex': historyDisplay})}>
            <div className={cx('history-modal')}>
              <button className={cx('history-close')}
                onClick={() => {
                  setHistoryDisplay(false);
                }}
              >
                <IoClose />
              </button>
              <h4 className={cx('history-title')}>Weather Search History</h4>
              <ul className={cx('history-list')}>
                <li className={cx('history-item')}>
                  <div className={cx('history-item-content')}>
                    <div className={cx('history-item-heading')}>
                      <img className={cx('history-item-img')} src='https://cdn.weatherapi.com/weather/64x64/day/116.png' alt='' />
                      <h4 className={cx('history-item-name')}>London</h4>
                    </div>
                    <h4 className={cx('history-item-text')}>Partly cloudy, 31&deg;C</h4>
                  </div>
                  <button className={cx('history-item-show')}>Show</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={cx('options')}>
          <FourDayInfo />
          <EmailSubScription />
        </div>
      </div>
    </div>
  );
}

export default MainPage;