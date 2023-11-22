import { useCMDK } from "@/context/cmdk.context";
import styles from "./CMDK.module.css";

function CMDKItem({ title, url, index, type, icon, matchResult, id }) {
  const { selectedItem, handleSelection, actionStack } = useCMDK();

  const isSelected = selectedItem === id;
  const level = title?.length - actionStack.length - 1;

  return (
    <li
      title={title}
      onClick={handleSelection}
      id={id}
      data-url={url}
      className={`${styles.item} ${isSelected ? styles.itemSelected : null} ${level > 1 ? styles.itemChild : null}`} 
    >
      {level > 1 && <div className={styles.lines}>
      {Array.from({ length: level - 1 }).map((_, i) => (
        <span key={i} className={styles.line}></span> 
        ))}
        </div>}
      {icon}
      {matchResult ? (
        <span dangerouslySetInnerHTML={{__html: matchResult}} className={styles.itemTitle}></span>
      ) :
      <span className={styles.itemTitle} >{title[title.length - 1]}</span>}
      <span className={styles.itemType}>{type}</span>
    </li>
  );
}

export default CMDKItem;
