import classNames from 'classnames/bind';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.scss';

import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';
import FutureInfo from '../../components/FutureInfo/FutureInfo';
import EmailSubScription from '../../components/EmailSubscription/EmailSubscription';
import { getWeatherData } from '../../api/weatherApi';
import { addSearchToHistory, getSearchHistory } from '../../utils/localStorage';

const cx = classNames.bind(styles);

function MainPage() {
  const navigate = useNavigate();

  const [data, setData] = useState(undefined);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Set isLoading to true while fetching data from the server to show the loading animation
  const [showMore, setShowMore] = useState(false); //4-day forecast show more
  const [history, setHistory] = useState([]);
  const [historyDisplay, setHistoryDisplay] = useState(false);
 

  //Fetch data from backend when the page is loaded
  useEffect(() => {
    const getData = async () => {
      const defaultLocation = 'London';

      setIsLoading(true);
      toast.dismiss();// delete all messages on the screen
      try {
        const result = await getWeatherData(defaultLocation);
        setData(result?.data);
        if (result?.data) {
          addSearchToHistory(result.data); //Use localStorage to save tempory weather information history(../untils/localStorage.js)
        }

      } catch (err) {
        if (err?.response?.status === 429) {
          navigate('/limit');
        } else {
          navigate('/error');
        }
      }
      setIsLoading(false);
    }
    getData();
  }, [navigate]);

  //Handle searching weather information of a location
  const handleSearch =  async () => {
    if (location.length === 0) {
      return;
    }

    setIsLoading(true);
    toast.dismiss();// delete all messages on the screen
    
    try {
      const result = await getWeatherData(location);

      //set data into new weather data if success, otherwise use current weather data
      if (result?.data.success) {
        setLocation('');
        addSearchToHistory(result.data);
        setData(result.data);
      } 
    } catch (err) {
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
          <form className={cx('search')}>
            <input type='text' className={cx('search-input')} autoComplete='off' placeholder='E.g., New York, London'
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <button className={cx('search-btn')}
              onClick={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <FaMagnifyingGlass />
            </button>
          </form>

          <div className={cx('weather')}>
            <div className={cx('weather-part')}>
              <img className={cx('weather-icon')} src={data?.current.icon} alt=''/>
              <div className={cx('weather-temp')}>
                <h1 className={cx('weather-temp-degree')}>{data?.current.temp || '--'}</h1>
                <h4 className={cx('weather-temp-unit')}>C</h4>
              </div>
              <h4 className={cx('weather-info')}>{data?.current.condition}</h4>
            </div>
            <div className={cx('weather-part', 'tablet-right')}>
              <span className={cx('seperate')}></span>
              <h3 className={cx('weather-date')}>{data?.current.date}</h3>
              <h4 className={cx('weather-text')}>Temperature: {data?.current.temp || '--'}&deg;C</h4>
              <h4 className={cx('weather-text')}>Wind: {data?.current.wind || '--'} M/S</h4>
              <h4 className={cx('weather-text')}>Humidity: {data?.current.humid || '--'}%</h4>
              <h1 className={cx('weather-location')}>{data?.name || 'Error fetching data from backend'}</h1>
            </div>
          </div>

          <button className={cx('history')}>
            <div className={cx('history-icon')}>
              <FaHistory />
            </div>
            <h4 className={cx('history-text')}
              onClick={() => {
                setHistoryDisplay(true);
                setHistory(getSearchHistory());
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
              {
                history.length > 0 ?
                history?.map((item, index) => {
                  return (
                    <li key={index} className={cx('history-item')}>
                      <div className={cx('history-item-content')}>
                        <div className={cx('history-item-heading')}>
                          <img className={cx('history-item-img')} src={item?.current?.icon} alt='' />
                          <h4 className={cx('history-item-name')}>{item?.name}</h4>
                        </div>
                        <h4 className={cx('history-item-text')}>{item?.current?.condition}, {item?.current?.temp}&deg;C</h4>
                      </div>
                      <button className={cx('history-item-show')}
                        onClick={() => {
                          setData(item);
                          setHistoryDisplay(false);
                          setShowMore(false);
                        }}
                      >
                        Show
                      </button>
                    </li>
                  )
                })
                :
                <h4>History is empty</h4>
              }
              </ul>
            </div>
          </div>
        </div>

        <div className={cx('options')}>
          <FutureInfo data={data?.nextDays} showMore={showMore} setShowMore={setShowMore}/>
          <EmailSubScription setIsLoading={setIsLoading} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;