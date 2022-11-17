import React from 'react';
import './Banner.scss';
import defaultBanner from '../../assets/banner/test.png'
import PropTypes from 'prop-types'

const Banner = (props) => {
  const { backgroundUrl } = props;
  

  const bannerUrl = backgroundUrl ?  `${backgroundUrl}` : defaultBanner
  
  return (
    <img src = {bannerUrl} className = "banner" alt = "banner"/>
  )
}

Banner.propTypes = {
  backgroundUrl: PropTypes.string, 
}

Banner.defaultProps = {
  backgroundUrl: '',
}


export default Banner