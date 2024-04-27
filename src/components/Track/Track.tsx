"use client";

import { trackType } from "@/types";
import styles from "./Track.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentTrack, toggleIsPlaying } from "@/store/features/playlistSlice";

type TrackType = {
  track: trackType;
  tracksData: trackType[];
};

export default function Track({ track, tracksData }: TrackType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { name, author, album, duration_in_seconds, id } = track;
  // const isPlaying = currentTrack ? currentTrack.id === track.id : false; // для инициализации играющего трека в плейлисте
  const { isPlaying } = useAppSelector((store) => store.playlist);

  const dispatch = useAppDispatch();
  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracksData }));
    dispatch(toggleIsPlaying(true));
  };

  return (
    <div onClick={handleTrackClick} className={styles.playlistItem}>
      <div className={classNames(styles.playlistTrack)}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {currentTrack?.id === track.id && (
              <div
                className={`${
                  isPlaying ? styles.playingDot : styles.stoppedDot
                }`}
              ></div>
            )}
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <a className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
            </a>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink}>{author}</a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink}>{album}</a>
        </div>
        <div className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.trackTimeText}>4:44</span>
        </div>
      </div>
    </div>
  );
}
