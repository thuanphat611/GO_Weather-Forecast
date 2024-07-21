import classNames from 'classnames/bind';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './MainPage.module.scss';

import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';
import FourDayInfo from '../../components/FourDayInfo/FourDayInfo';
import EmailSubScription from '../../components/EmailSubscription/EmailSubscription';
import { getWeatherData } from '../../api/weatherApi';

const cx = classNames.bind(styles);

function MainPage() {
  const [data, setData] = useState(undefined);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Set isLoading to true while fetching data from the server to show the loading animation
  const [historyDisplay, setHistoryDisplay] = useState(false);
 

  //Fetch data from backend when the page is loaded
  useEffect(() => {
    const getData = async () => {
      const defaultLocation = 'Ho Chi Minh';

      setIsLoading(true);
      
      const result = await getWeatherData(defaultLocation);

      setIsLoading(false);
      setData(result.data);
    }
    getData();
  }, []);

  //Handle searching weather information of a location
  const handleSearch =  async () => {
    if (location.length === 0) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await getWeatherData(location);

      //set data into new weather data if success, otherwise use current weather data
      if (result?.data.success) {
        setLocation('');
        setData(result.data);
      }
    } catch (err) {
      //use react-toastify to display toast messages
      toast.error(err?.response?.data?.error || 'Some error occured, please try again');
    }

    setIsLoading(false);
  }

  return (
    <div className={cx('content')}>
      <div className={cx('header')}>
        <h2 className={cx('header-text')}>GO Weather Forecast</h2>
      </div>

      <LoadingAnimation isLoading={isLoading} />
      <div className={cx('body')}>
        <div className={cx('main-info')}>
          <div className={cx('search')}>
            <input type='text' className={cx('search-input')} autocomplete='off' placeholder='E.g., New York, London'
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <button className={cx('search-btn')}
              onClick={() => {
                handleSearch();
              }}
            >
              <FaMagnifyingGlass />
            </button>
          </div>

          <div className={cx('weather')}>
            <img className={cx('weather-icon')} src={'https:' + data?.current.icon} alt=''/>
            <div className={cx('weather-temp')}>
              <h1 className={cx('weather-temp-degree')}>{data?.current.temp}</h1>
              <h4 className={cx('weather-temp-unit')}>C</h4>
            </div>
            <h4 className={cx('weather-info')}>{data?.current.condition}</h4>
            <span className={cx('seperate')}></span>
            <h3 className={cx('weather-date')}>{data?.current.date}</h3>
            <h4 className={cx('weather-text')}>Temperature: {data?.current.temp}&deg;C</h4>
            <h4 className={cx('weather-text')}>Wind: {data?.current.wind} mph</h4>
            <h4 className={cx('weather-text')}>Humidity: {data?.current.humid}%</h4>
            <h1 className={cx('weather-location')}>{data?.name}</h1>
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
          <FourDayInfo data={data?.nextDays}/>
          <EmailSubScription />
        </div>
      </div>
    </div>
  );
}

export default MainPage;