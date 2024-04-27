import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Nav from "@/components/Nav/Nav";
import Player from "@/components/Player/Player";
import Playlist from "@/components/Playlist/Playlist";
import Search from "@/components/Search/Search";


export default function Home() {

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>
            <Search />
            <Playlist
            />
          </div>
          <Sidebar />
        </main>
        
          <Player
          />
       
        <footer className={styles.footer} />
      </div>
    </div>
  );
}
