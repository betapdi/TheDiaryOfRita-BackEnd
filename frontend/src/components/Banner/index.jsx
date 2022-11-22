import $ from 'jquery';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from "react-redux";
import { getBannerList } from "../../slices/bannerSlice";
import './Banner.scss';

const Banner = (props) => {
  const BANNER_SHOW_TIME = 7000;
  
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

  const updateSpecificBannerIdTrasitionButton = (oldBannerId, newBannerId) => {
    console.log("update", oldBannerId, newBannerId);
    $(".buttonTransition"+oldBannerId).css("background-color", "white");
    $(".buttonTransition"+oldBannerId).css("border-color", "#e1e1e1");
    $(".buttonTransition"+newBannerId).css("background-color", "#ed1c24");
    $(".buttonTransition"+newBannerId).css("border-color", "#ed1c24");
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

    $(document).on({
      mouseenter: () => {
        $(".previousBannerButton").css("background-color", "#ffffff");
        $(".previousBannerButton").css("transform", "scale(1)");
        $(".previousBannerButton").css("transition", "transform 0.3s ease");
        $(".nextBannerButton").css("background-color", "#ffffff");
        $(".nextBannerButton").css("transform", "scale(1)");
        $(".nextBannerButton").css("transition", "transform 0.3s ease");
      },
      mouseleave: () => {
        $(".nextBannerButton").css("transform", "scale(0)");
        $(".nextBannerButton").css("transition", "transform 0.3s ease");
        $(".previousBannerButton").css("transform", "scale(0)");
        $(".previousBannerButton").css("transition", "transform 0.3s ease");
      }
    }, ".bannerContainer");
    
    setBannerId(0);
    setBannerElement(tmpElement);
    updateSpecificBannerIdTrasitionButton(0, 0);
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
                updateSpecificBannerIdTrasitionButton(bannerid, getNextBannerIndex());
                setPreviousBannerId(bannerid);
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
            updateSpecificBannerIdTrasitionButton(bannerid, getPreviousBannerIndex());
            setPreviousBannerId(bannerid);
            setBannerId(getPreviousBannerIndex())
          }}
        >&lt;</button>
        <button className='transitionBannerButton directToConsecutiveBannerButton nextBannerButton'  
          onClick={() => {
            updateSpecificBannerIdTrasitionButton(bannerid, getNextBannerIndex( ));
            setPreviousBannerId(bannerid);
            setBannerId(getNextBannerIndex())
          }}
        >&gt;</button>
        
        <div className='specificBannerIdTransitionContainer'>
          {banners.map((banner, index) => (
            <button key={index} className={'specificBannerIdTransitionButton ' + 'buttonTransition' + index} onClick={
              () => {
                updateSpecificBannerIdTrasitionButton(bannerid, index);
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