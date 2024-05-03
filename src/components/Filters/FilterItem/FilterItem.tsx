import { trackType } from "@/types";
import styles from "./FilterItem.module.css";
import classNames from "classnames";
import { order } from "../data";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setFilters } from "@/store/features/playlistSlice";

type FilterItemType = {
  title: string;
  value: "author" | "genre" | "order";
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
  tracksData: trackType[];
  optionList?: string[];
};

export default function FilterItem({
  handleFilterClick,
  title,
  value,
  isOpened,
  tracksData,
  optionList = [],
}: FilterItemType) {
  const dispatch = useAppDispatch();
  const getFilterList = () => {
    if (value !== "order") {
      const array = new Set(
        tracksData?.map((track: trackType) => track[value]) || []
      );
      return Array.from(array);
    }
    return order;
  };

  const toggleFilter = (item: string) => {
    if (value === "order") {
      dispatch(setFilters({ order: item }));
      return;
    }
    dispatch(
      setFilters({
        [value]: optionList.includes(item)
          ? optionList.filter((el) => el !== item)
          : [...optionList, item],
      })
    );
  };

  getFilterList();
  return (
    <div className={styles.wrapper}>
      <div
        onClick={() => handleFilterClick(title)}
        className={classNames(styles.filterButton, styles.BtnText)}
      >
        {title}
      </div>
      {isOpened && (
        <ul className={styles.filterList}>
          {getFilterList().map((item) => (
            <li
              onClick={() => toggleFilter(item)}
              className={styles.filterItem}
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
