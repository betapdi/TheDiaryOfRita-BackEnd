import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from "react-redux";
import { getBannerList } from "../../slices/bannerSlice";
import './Banner.scss';

const Banner = (props) => {
  const BANNER_SHOW_TIME = 5000;

  const [banner, setBanner] = useState((<></>));
  const [bannerid, setBannerId] = useState(0);
  const dispatch = useDispatch()
  const banners = useSelector((state) => state.bannerList);
  const [countdownClock, setCountdownClock] = useState();

  const getNextBannerIndex = () => {
    return (bannerid + 1) % banners.length;
  } 

  const getPreviousBannerIndex = () => {
    if (bannerid == 0) return banners.length - 1;
    return (bannerid - 1) % banners.length;
  } 

  useEffect(() => {
    const fetchBanner = async () => {
      dispatch(getBannerList());
    }
    
    fetchBanner();
  }, []);

  useEffect(() => {
    if (banners.length == 0) return;
    console.log("banners", banners);

    setBanner((
      <img className="banner" src = {`${process.env.REACT_APP_SERVER_URL}` + banners[bannerid].image} alt = "banner"/>
    ));

    setCountdownClock(
        <Countdown
            date={Date.now() + BANNER_SHOW_TIME}
            key = {bannerid}
            onComplete = {() => {
                setBannerId(getNextBannerIndex());
            }}
        ></Countdown>
    );

  }, [bannerid, banners])

  return (
    <>
      <div className='countDownClock'>{countdownClock}</div>
      <div className='bannerContainer'>
        {banner}
        <button className='transitionBannerButton previousBannerButton' onClick={() => {setBannerId(getPreviousBannerIndex())}}/>
        <button className='transitionBannerButton nextBannerButton'  onClick={() => {setBannerId(getNextBannerIndex())}}/>
      </div>
    </>
  )
}

Banner.propTypes = {
  backgroundUrl: PropTypes.string, 
}

Banner.defaultProps = {
  backgroundUrl: '',
}


export default Banner