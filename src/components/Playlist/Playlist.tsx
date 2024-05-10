'use client'

import Track from "../Track/Track";
import styles from "./Playlist.module.css";
import classNames from "classnames";
import { trackType } from "@/types";


export default function Playlist({tracks, playlist, isLoading}:{tracks:trackType[], playlist:trackType[], isLoading?: boolean}) {


  return (
    <>
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
        {isLoading ? 'Загрузка...' : tracks?.length === 0 ? 'Нет треков, удовлетворяющих условиям фильтра' : ''} 
        {tracks?.map((track) => (
          <Track key={track.id} track={track} tracksData={playlist} />
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
