import Nav from "@/components/Nav/Nav";
import Player from "@/components/Player/Player";
import Search from "@/components/Search/Search";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./layout.module.css";

export default function TrackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>
            <Search />
            {children}
          </div>
          <Sidebar />
        </main>

        <Player />

        <footer className={styles.footer} />
      </div>
    </div>
  );
}
