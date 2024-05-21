"use client";

import { trackType } from "@/types";
import styles from "./Track.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setCurrentTrack,
  toggleIsPlaying,
} from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { FormatSeconds } from "@/lib/FormatSeconds";
import { setDislike, setLike } from "@/api/tracks";
import { getValueFromLocalStorage } from "@/lib/getValueFromLS";

type TrackType = {
  track: trackType;
  tracksData: trackType[];
  isFavorite?: boolean;
};

export default function Track({ track, tracksData, isFavorite }: TrackType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { name, author, album, duration_in_seconds, id } = track;
  // const isPlaying = currentTrack ? currentTrack.id === track.id : false; // для инициализации играющего трека в плейлисте
  const { isPlaying } = useAppSelector((store) => store.playlist);
  const { user } = useUser();
  const token = getValueFromLocalStorage("token");
  console.log(user?.id, track.stared_user.find((u) => u.id === user?.id));
  const isLikedByUser =
    isFavorite || track.stared_user.find((u) => u.id === user?.id);
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(!!isLikedByUser);
  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track: { ...track, isFavorite }, tracksData }));
    dispatch(toggleIsPlaying(true));
  };

  const handleLikeClick = () => {
    isLiked ? setDislike(token.access, id) : setLike(token.access, id);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const isLikedByUser =
    isFavorite || track.stared_user.find((u) => u.id === user?.id);
    console.log(isLikedByUser);
    setIsLiked(!!isLikedByUser);
  },[track]);

  return (
    <div className={styles.playlistItem}>
      <div className={classNames(styles.playlistTrack)}>
        <div onClick={handleTrackClick} className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {currentTrack?.id === track.id && (
              <div
                className={`${
                  isPlaying ? styles.playingDot : styles.stoppedDot
                }`}
              ></div>
            )}
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <a className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
            </a>
          </div>
        </div>
        <div onClick={handleTrackClick} className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink}>{author}</a>
        </div>
        <div onClick={handleTrackClick} className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink}>{album}</a>
        </div>
        <div onClick={handleLikeClick}>
          <svg className={styles.trackTimeSvg}>
            <use
              xlinkHref={`/img/icon/sprite.svg#${
                isLiked ? "icon-like-active" : "icon-like"
              }`}
            />
          </svg>
        </div>
        <div className={styles.trackTime}>
          <span className={styles.trackTimeText}>
            {FormatSeconds(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
