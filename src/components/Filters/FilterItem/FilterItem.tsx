import styles from "./FilterItem.module.css";
import classNames from "classnames";

type FilterItemType = {
  title: string;
  list: string[];
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
};

export default function FilterItem({ handleFilterClick, title, list, isOpened }: FilterItemType) {
  return (
    <div className={styles.wrapper}>
      <div onClick={() => handleFilterClick(title)} className={classNames(styles.filterButton, styles.BtnText)}>
        {title}
      </div>
      {isOpened &&(<ul className={styles.filterList}>
        {list.map((item) => (
          <li className={styles.filterItem} key={item}>{item}</li>
        ))}
      </ul>)}
    </div>
  );
}
