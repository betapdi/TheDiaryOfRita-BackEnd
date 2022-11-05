import React from 'react'
import PropTypes from 'prop-types'
import './Banner.scss'
import defaultBanner from '../../assets/images/test.png'

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