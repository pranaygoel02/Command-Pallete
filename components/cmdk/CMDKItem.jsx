import { useCMDK } from "@/context/cmdk.context";
import styles from "./CMDK.module.css";

function CMDKItem({ title, url, index, type, icon, matchResult, id, level, stack }) {
  const { selectedItem, handleSelection, actionStack, searchTerm } = useCMDK();

  const isSelected = selectedItem === id;
  
  console.log(level, stack.length, actionStack.length, "ref - ", stack.length - (actionStack.length <= 1 ? 0 : actionStack.length) - 1, title);
  level = stack.length - (actionStack.length <= 1 ? 0 : actionStack.length) - 1
  
  return (
    <li
      title={title}
      onClick={handleSelection}
      id={id}
      data-url={url}
      className={`${styles.item} ${isSelected ? styles.itemSelected : null} ${
        level > 1 ? styles.itemChild : null
      } ${type === null && level < 1 ? styles.groupTitle : null}`}
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
