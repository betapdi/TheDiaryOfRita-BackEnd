import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBannerList } from "../../slices/bannerSlice";
import './Banner.scss';
import Countdown from 'react-countdown';

const Banner = (props) => {
  const dispatch = useDispatch()
  const banners = useSelector((state) => state.bannerList);
  
  useEffect(() => {
    const fetchBanner = async () => {
      dispatch(getBannerList());
    }
    
    fetchBanner();
    console.log(banners);
  }, []);
  
  return (
    <div>
        <Countdown date={Date.now() + 5000}><div>aaa</div></Countdown>

      {banners.map((banner) => (
        <img src = {`${process.env.REACT_APP_SERVER_URL}` + banner.image} className = "banner" alt = "banner"/>
      ))}
    </div>
  )
}

Banner.propTypes = {
  backgroundUrl: PropTypes.string, 
}

Banner.defaultProps = {
  backgroundUrl: '',
}


export default Banner