import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBannerList } from "../../slices/bannerSlice";
import './Banner.scss';

const Banner = (props) => {
  const dispatch = useDispatch()
  const banners = useSelector((state) => state.bannerList);

  useEffect(() => {
    const fetchBanner = async () => {
      dispatch(getBannerList());

      console.log("BANNER", banners);
    }

    // fetchBanner();
  }, []);

  return (
    <img src = {""} className = "banner" alt = "banner"/>
  )
}

Banner.propTypes = {
  backgroundUrl: PropTypes.string, 
}

Banner.defaultProps = {
  backgroundUrl: '',
}


export default Banner