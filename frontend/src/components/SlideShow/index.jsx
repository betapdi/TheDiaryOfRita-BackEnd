import React from 'react'
import { useEffect, useState } from 'react'
import defaultBanner1 from '../../assets/images/test.png'
import defaultBanner2 from '../../assets/images/test2.png'
import './SlideShow.scss'

const SlideShow = () => {
  return (
    <div className = "SlideShow">
      <img src = {defaultBanner1} className = "SlideShow__banner"/>
      <img src = {defaultBanner2} className = "SlideShow__banner"/>
    </div>
  )
}

export default SlideShow