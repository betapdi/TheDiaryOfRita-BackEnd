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
    const [mostViewOption, setMostViewOption] = useState(0);
    const [previousMostViewOption, setPreviousMostViewOption] = useState(0);

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
      const Xpos_topMangaElement = window.scrollX + document.querySelector('.topMangaContainer').getBoundingClientRect().left;
      const Xpos_topMangaComponentElement = window.scrollX + document.querySelector('.topMangaComponentContainer').getBoundingClientRect().left;
      const Xpos = Xpos_topMangaComponentElement - Xpos_topMangaElement;
      $(".extraComponentInTopManga").css("margin-left", Xpos - + "px");
      $(".extraComponentInTopManga").css("transform", "translateX(1.5vw)");
    }, [mangas]);

    useEffect(() => {
      $(".mostViewOption"+previousMostViewOption).css("background-color", "white");
      $(".mostViewOption"+previousMostViewOption).css("border-radius", "0rem");
      $(".mostViewOption"+mostViewOption).css("background-color", "#ffdee7");
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
          <button className="mostDayViewBtn btn mostViewOption0" onClick={() => {changeMostViewOption(mangas.slice(0, 7), 0)}}>View ngày</button>
          <button className="mostWeekViewBtn btn mostViewOption1" onClick={() => {changeMostViewOption(mangas.slice(1, 8), 1)}}>View tuần</button>
          <button className="mostMonthViewBtn btn mostViewOption2" onClick={() => {changeMostViewOption(mangas.slice(2, 9), 2)}}>View tháng</button>
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
      </div>
    );
};

export default TopManga;
