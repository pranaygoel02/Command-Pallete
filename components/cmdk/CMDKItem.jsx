import { useCMDK } from "@/context/cmdk.context";
import styles from "./CMDK.module.css";

function CMDKItem({ title, url, index, type, icon, matchResult, id, level }) {
  const { selectedItem, handleSelection, actionStack, searchTerm } = useCMDK();

  const isSelected = selectedItem === id;
  
  return (
    <li
      title={title}
      onClick={handleSelection}
      id={id}
      data-url={url}
      className={`${styles.item} ${isSelected ? styles.itemSelected : null} ${
        level > 1 ? styles.itemChild : null
      } ${type === null && level < 1 ? styles.borderTop : null}`}
    >
      {level > 1 && (
        <div className={styles.lines}>
          {Array.from({ length: level - 1 }).map((_, i) => (
            <span key={i} className={styles.line}></span>
          ))}
        </div>
      )}
      {icon}
      <span
        className={styles.itemTitle}
        dangerouslySetInnerHTML={{
          __html: matchResult || title,
        }}
      ></span>
      <span className={styles.itemType}>{type}</span>
    </li>
  );
}

export default CMDKItem;
