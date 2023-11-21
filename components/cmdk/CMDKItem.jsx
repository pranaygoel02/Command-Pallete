import { useCMDK } from "@/context/cmdk.context";
import styles from "./CMDK.module.css";

function CMDKItem({ title, url, index, type, icon, matchResult }) {
  const { selectedItem } = useCMDK();

  const isSelected = selectedItem === index;

  return (
    <li
      title={title}
      id={index}
      data-url={url}
      className={`${styles.item} ${isSelected ? styles.itemSelected : null}`}
    >
      {icon}
      {matchResult ? (
        <span dangerouslySetInnerHTML={{__html: matchResult}} className={styles.itemTitle}></span>
      ) :
      <span className={styles.itemTitle}>{title}</span>}
      <span className={styles.itemType}>{type}</span>
    </li>
  );
}

export default CMDKItem;
