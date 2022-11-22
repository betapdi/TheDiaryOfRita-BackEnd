import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavouriteList } from '../../slices/favouriteSlice'

const FavouritesPage = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavouriteList())
  }, [])

  const favouriteList = useSelector(state => state.favouriteList)
  console.log(favouriteList);

  return (
    <div className = "manga-page">
      HAHAHA
    </div>
  )
}

export default FavouritesPage