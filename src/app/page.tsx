"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Nav from "@/components/Nav/Nav";
import Player from "@/components/Player/Player";
import Playlist from "@/components/Playlist/Playlist";
import Search from "@/components/Search/Search";
import { useState } from "react";
import { trackType } from "@/types";

export default function Home() {
  const [track, setTrack] = useState<trackType | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>
            <Search />
            <Playlist
              setTrack={setTrack}
              setIsPlaying={setIsPlaying}
            />
          </div>
          <Sidebar />
        </main>
        {track && (
          <Player
            track={track}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}
        <footer className={styles.footer} />
      </div>
    </div>
  );
}
