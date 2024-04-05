import styles from "./Search.module.css";
import classNames from "classnames";

export default function Search() {
  return (
    <>
      <div className={styles.centerblockSearch}>
        <svg className={styles.searchSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-search" />
        </svg>
        <input
          className={styles.searchText}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblockH2}>Треки</h2>
      <div className={styles.centerblockFilter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div className={classNames(styles.filterButton, styles.BtnText)}>
          исполнителю
        </div>
        <div className={classNames(styles.filterButton, styles.BtnText)}>году выпуска</div>
        <div className={classNames(styles.filterButton, styles.BtnText)}>жанру</div>
      </div>
    </>
  );
}
