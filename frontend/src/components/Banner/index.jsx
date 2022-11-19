import $ from 'jquery';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from "react-redux";
import { getBannerList } from "../../slices/bannerSlice";
import './Banner.scss';

const Banner = (props) => {
  const BANNER_SHOW_TIME = 5000;
  
  const [bannerElement, setBannerElement] = useState((<></>));
  const [bannerid, setBannerId] = useState(-1);
  const [previousBannerId, setPreviousBannerId] = useState(0);
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

    let tmpElement = (
      <div className='banner'>
        {
          banners.map((banner, index) => <img key={index} className={"img banner"+index} src={`${process.env.REACT_APP_SERVER_URL}` + banner.image} alt="banner"/>)
        }
      </div>
    );

    setBannerId(0);
    setBannerElement(tmpElement);
  }, [banners])

  useEffect(() => {
    const setupNewBanner = () => {
      setCountdownClock(
          <Countdown
              date={Date.now() + BANNER_SHOW_TIME}
              key = {bannerid}
              precision={3}

              onStart = {() => {
                $(".banner"+previousBannerId).css("opacity", "0", "important");
                $(".banner"+bannerid).css("opacity", "1", "important");
              }}
              
              onComplete = {() => {
                $(".banner"+bannerid).css("opacity", "0", "important");
                setBannerId(getNextBannerIndex());
              }}
          ></Countdown>
      );
    }

    setupNewBanner();
  }, [bannerid])

  return (
    <>
      <div className='countDownClock'>{countdownClock}</div>
      <div className='bannerContainer'>
        {bannerElement}
        <button className='transitionBannerButton directToConsecutiveBannerButton previousBannerButton' 
          onClick={() => {
            setPreviousBannerId(bannerid);
            setBannerId(getPreviousBannerIndex())
          }}
        />
        <button className='transitionBannerButton directToConsecutiveBannerButton nextBannerButton'  
          onClick={() => {
            setPreviousBannerId(bannerid);
            setBannerId(getNextBannerIndex())
          }}
        />
        
        <div className='specificBannerIdTransitionContainer'>
          {banners.map((banner, index) => (
            <button key={index} className='specificBannerIdTransitionButton' onClick={
              ()=>{
                setPreviousBannerId(bannerid);
                setBannerId(index);
              }}
            />
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