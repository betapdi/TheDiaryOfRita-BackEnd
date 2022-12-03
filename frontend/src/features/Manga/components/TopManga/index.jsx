import $ from 'jquery';
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import mangaApi from '../../../../api/mangaApi';
import { getTopManga } from '../../slices/topMangaSlice';
import "./TopManga.scss";

const TopManga = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const mangaRanking = useSelector((state) => state);  
    const [topManga, setTopManga] = useState([]);
    const [mostViewOption, setMostViewOption] = useState(0);
    const [previousMostViewOption, setPreviousMostViewOption] = useState(0);

    useEffect(() => {
      const fetchTopMangas = async () => {
          try {
              await mangaApi.getTopMangas();
              dispatch(getTopManga());
          } catch (error) {
              console.log("Failed to fetch top manga list: ", error);
          }
      };

      fetchTopMangas();
    }, []);

    const mangas = useSelector((state) => state.topManga);
    console.log("top manga", mangas);

    useEffect(() => {
      setTopManga(mangas.slice(0, 7));
      const Xpos_topMangaElement = window.scrollX + document.querySelector('.topMangaContainer').getBoundingClientRect().left;
      const Xpos_topMangaComponentElement = window.scrollX + document.querySelector('.topMangaComponentContainer').getBoundingClientRect().left;
      const Xpos = Xpos_topMangaComponentElement - Xpos_topMangaElement;
      $(".extraComponentInTopManga").css("margin-left", Xpos - + "px");
      $(".extraComponentInTopManga").css("transform", "translateX(1vw)");
    }, [mangas]);

    useEffect(() => {
      $(".mostViewOption"+previousMostViewOption).css("background-color", "white");
      $(".mostViewOption"+previousMostViewOption).css("border-radius", "0rem");
      $(".mostViewOption"+mostViewOption).css("background-color", "#F29393");
      $(".mostViewOption"+mostViewOption).css("border-radius", "3rem");

    }, [mostViewOption]);

    const changeMostViewOption = (topManga, newViewOption) => {
      setPreviousMostViewOption(mostViewOption);
      setMostViewOption(newViewOption);
      setTopManga(topManga);
    }

    return (
      <div className="topMangaComponentContainer">
        <div className="extraComponentInTopManga">
          <p className="topMangaLabel">Top Manga</p>
          <div className="btnComponents">
            <button className="mostDayViewBtn btn mostViewOption0" onClick={() => {changeMostViewOption(mangas.slice(0, 7), 0)}}>View ngày</button>
            <button className="mostWeekViewBtn btn mostViewOption1" onClick={() => {changeMostViewOption(mangas.slice(1, 8), 1)}}>View tuần</button>
            <button className="mostMonthViewBtn btn mostViewOption2" onClick={() => {changeMostViewOption(mangas.slice(2, 9), 2)}}>View tháng</button>
          </div>
        </div>
        <MDBRow className="topMangaContainer">
            {topManga.length > 0 && (
                <>
                    <MDBCol md="5">
                        <img className="top1Manga" src={process.env.REACT_APP_SERVER_URL + topManga[0].cover} onClick={() => navigate("" + topManga[0].value)}/>
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
                                          onClick={() => navigate("" + manga.value)}
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
                                          onClick={() => navigate("" + manga.value)}
                                        />
                                    </MDBCol>
                                );
                            })}
                        </MDBRow>
                    </MDBCol>
                </>
            )}
        </MDBRow>
      </div>
    );
};

export default TopManga;
