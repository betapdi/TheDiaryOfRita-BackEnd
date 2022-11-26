import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mangaApi from '../../../../api/mangaApi';
import { getAllManga } from '../../slices/mangaListSlice';
import "./TopManga.scss";

const TopManga = () => {
    const dispatch = useDispatch();

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
    const topManga = mangas.slice(1, 8);
    console.log(topManga[0]);

    return (
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
                                    <MDBCol md="4">
                                        <img 
                                          className="otherTopManga" 
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
                                    <MDBCol md="4">
                                        <img 
                                          className="otherTopManga" 
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
    );
};

export default TopManga;
