"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Player.module.css";
import classNames from "classnames";
import { trackType } from "@/types";
import ProgressBar from "../ProgressBar/ProgressBar";
import VolumeBar from "../VolumeBar/VolumeBar";

type PlayerType = {
  track: trackType;
  isPlaying: boolean;
  setIsPlaying: (param: boolean) => void;
};

export default function Player({ track, isPlaying, setIsPlaying }: PlayerType) {
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [isLooped, setIsLooped] = useState<boolean>(false);

  const duration = audioRef.current?.duration;
  useEffect(() => {});
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleRepeat = () => {
    setIsLooped(!isLooped);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [isPlaying, track]);

  useEffect(() => {
    if (audioRef.current) {
      if (isLooped) {
        audioRef.current.loop = true;
      } else {
        audioRef.current.loop = false;
      }
    }
  }, [isLooped]);

  // useEffect(() => {
  //   isLooped ? (repeat = true) : (repeat = false);
  // }, [isLooped]);

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () =>
      setCurrentTime(audioRef.current!.currentTime)
    );
  }, []);

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value));
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const changeVolume = (e: any) => {
    setVolume(e.target.value);
  };

  function FormatSeconds(inputSec: number | undefined) {
    if (inputSec) {
      let minutes: number = Math.floor(inputSec / 60);
      let seconds =Math.floor(inputSec) - minutes * 60;
      return `${minutes} : ${seconds>9?"":"0"}${seconds} `;
    }
  }

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio ref={audioRef} src={track.track_file}></audio>
        <div className={styles.timeLine}>
          {FormatSeconds(currentTime)} / {FormatSeconds(duration)}
        </div>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleSeek}
        />
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div onClick={() => alert("еще не реализовано")} className={styles.playerBtnPrev}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                </svg>
              </div>
              <div
                onClick={togglePlay}
                className={classNames(styles.playerBtnPlay, styles.btn)}
              >
                <svg className={styles.playerBtnPlaySvg}>
                  <use
                    xlinkHref={`img/icon/sprite.svg#${
                      isPlaying ? "icon-pause" : "icon-play"
                    }`}
                  />
                </svg>
              </div>
              <div onClick={() => alert("еще не реализовано")} className={styles.playerBtnNext}>
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div
                onClick={toggleRepeat}
                className={classNames(styles.playerBtnRepeat, styles.BtnIcon)}
              >
                <svg className={styles.playerBtnRepeatSvg}>
                  <use
                    xlinkHref={`img/icon/sprite.svg#${
                      isLooped ? "icon-repeat-active" : "icon-repeat"
                    }`}
                  />
                </svg>
              </div>
              <div
                className={classNames(styles.playerBtnShuffle, styles.BtnIcon)}
              >
                <svg className={styles.playerBtnShuffleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
                </svg>
              </div>
            </div>
            <div className={styles.playerTrackPlay}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-note" />
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href="http://">
                    {track.name}
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="http://">
                    {track.author}
                  </a>
                </div>
              </div>
              <div className={styles.trackPlayLikeDis}>
                <div
                  className={classNames(styles.trackPlayLike, styles.BtnIcon)}
                >
                  <svg className={styles.trackPlayLikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-like" />
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.trackPlayDislike,
                    styles.BtnIcon
                  )}
                >
                  <svg className={styles.trackPlayDislikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.barVolumeBlock}>
            <div className={styles.volumeContent}>
              <div className={styles.volumeImage}>
                <svg className={styles.volumeSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-volume" />
                </svg>
              </div>
              <div className={classNames(styles.volumeProgress, styles.btn)}>
                <VolumeBar
                  //className={classNames(styles.volumeProgressLine, styles.btn)}
                  step={0.01}
                  volume={volume}
                  onChange={changeVolume}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
