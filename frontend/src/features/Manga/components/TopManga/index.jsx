import $ from 'jquery';
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mangaApi from '../../../../api/mangaApi';
import { getAllManga } from '../../slices/mangaListSlice';
import "./TopManga.scss";

const TopManga = () => {
    const dispatch = useDispatch();
    const [topManga, setTopManga] = useState([]);

    useEffect(() => {
        const fetchMangaList = async () => {
            try {
                await mangaApi.getAll();
                dispatch(getAllManga());
            } catch (error) {
                console.log("Failed to fetch manga list: ", error);
            }
        };

        fetchMangaList();
    }, []);

    const mangas = useSelector((state) => state.mangaList);

    useEffect(() => {
      setTopManga(mangas.slice(0, 7));
    }, [mangas])
    
    useEffect(() => {
      const Xpos_topMangaElement = window.scrollX + document.querySelector('.topMangaContainer').getBoundingClientRect().left;
      $(".extraComponentInTopManga").css("margin-left", Xpos_topMangaElement + "px");
    }, [mangas]);

    return (
      <div className="topMangaComponentContainer">
        <div className="extraComponentInTopManga">
          <p className="topMangaLabel">Top Manga</p>
          <button className="mostDayViewBtn btn" onClick={() => {setTopManga(mangas.slice(0, 7))}}>View ngày</button>
          <button className="mostWeekViewBtn btn" onClick={() => {setTopManga(mangas.slice(1, 8))}}>View tuần</button>
          <button className="mostMonthViewBtn btn" onClick={() => {setTopManga(mangas.slice(2, 9))}}>View tháng</button>
        </div>
        <MDBRow className="topMangaContainer">
            {topManga.length > 0 && (
                <>
                    <MDBCol md="5">
                        <img className="top1Manga" src={process.env.REACT_APP_SERVER_URL + topManga[0].cover}/>
                    </MDBCol>
                    <MDBCol md="7" className="otherTopMangaContainer">
                        <MDBRow className="belowTopMangaContainer">
                            {topManga.map((manga, index) => {
                                if (index == 0 || index > 3) return; 
                                return (
                                    <MDBCol md="4" key={index} className="otherTopManga">
                                        <img 
                                          className="imgcoverTopManga"
                                          src={process.env.REACT_APP_SERVER_URL + topManga[index].cover}
                                        />
                                    </MDBCol>
                                );
                            })}
                        </MDBRow>
                        <MDBRow className="underTopMangaContainer">
                            {topManga.map((manga, index) => {
                                if (index == 0 || index <= 3) return; 
                                return (
                                    <MDBCol md="4" key={index} className="otherTopManga">
                                        <img
                                          className="imgcoverTopManga"
                                          src={process.env.REACT_APP_SERVER_URL + topManga[index].cover}
                                        />
                                    </MDBCol>
                                );
                            })}
                        </MDBRow>
                    </MDBCol>
                </>
            )}
        </MDBRow>
        ,
        ,
        ,
        ,,,
        ,

      </div>
    );
};

export default TopManga;
