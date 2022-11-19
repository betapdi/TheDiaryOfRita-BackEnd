import $ from 'jquery';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from "react-redux";
import { getBannerList } from "../../slices/bannerSlice";
import './Banner.scss';

const Banner = (props) => {
  const BANNER_SHOW_TIME = 5000;
  const BANNER_STARTING_FADE_TIME = 1;
  
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
    
    setBanner(
      <img className="banner" src = {`${process.env.REACT_APP_SERVER_URL}` + banners[bannerid].image} alt = "banner"/>
    );

    const setupNewBanner = async () => {
      setCountdownClock(
          <Countdown
              date={Date.now() + BANNER_SHOW_TIME}
              key = {bannerid}
              precision={3}

              onStart = {() => {
                $(".banner").css("animation", "fadein 1s ease");
              }}
              
              onTick = {({seconds, milliseconds}) => {
                let remain_time = seconds * 1000 + milliseconds;
                console.log(remain_time / 1000);
              }}
              
              onComplete = {() => {
                $(".banner").css("animation", "none");
                setBannerId(getNextBannerIndex());
              }}
          ></Countdown>
      );
    }

    setupNewBanner()
  }, [bannerid, banners])

  return (
    <>
      <div className='countDownClock'>{countdownClock}</div>
      <div className='bannerContainer'>
        {banner}
        <button className='transitionBannerButton directToConsecutiveBannerButton previousBannerButton' onClick={() => {setBannerId(getPreviousBannerIndex())}}/>
        <button className='transitionBannerButton directToConsecutiveBannerButton nextBannerButton'  onClick={() => {setBannerId(getNextBannerIndex())}}/>
        
        <div className='specificBannerIdTransitionContainer'>
          {banners.map((banner, index) => (
            <button key={index} className='specificBannerIdTransitionButton' onClick={()=>{setBannerId(index)}}>
            </button>
          ))}
        </div>
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