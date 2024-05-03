'use client'

import { getTracks } from "@/api/tracks";
import Track from "../Track/Track";
import styles from "./Playlist.module.css";
import classNames from "classnames";
import { trackType } from "@/types";
import Filters from "../Filters/Filters";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";

export default function Playlist() {

  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<trackType[]>([]);
  const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks)

  let tracksData: trackType[];

useEffect(() => {
    getTracks().then((tracksData) => {
      setTracks(tracksData);
      dispatch(setInitialTracks({initialTracks: tracksData}))
    })
    .catch((error: any) => {
      throw new Error(error.message);
    })
  
},[dispatch])

  return (
    <>
    <Filters tracksData = {tracks} />
    <div className={styles.centerblockContent}>
      <div className={styles.contentTitle}>
        <div className={classNames(styles.playlistTitleCol, styles.col01)}>
          Трек
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col02)}>
          Исполнитель
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col03)}>
          Альбом
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col04)}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <div className={styles.contentPlaylist}>
        {filteredTracks.map((track) => (
          <Track key={track.id} track={track} tracksData={tracks} />
        ))}
      </div>
    </div>
    </>
  );
}

//   // Обратите внимание, что функция компонента также является асинхронной
//   export default async function HomePage() {
//     const data = await getData();

//     return <main>/* Некий контент */</main>;
//   }
