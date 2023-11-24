import { useCMDK } from "@/context/cmdk.context";
import styles from "./CMDK.module.css";
import Command from "./Command";

function CMDKItem({
  title,
  url,
  index,
  type,
  icon,
  matchResult,
  id,
  level,
  stack,
  cmd,
}) {
  const { selectedItem, handleSelection, actionStack, searchTerm } = useCMDK();

  const isSelected = selectedItem === id;

  level = stack.length - (actionStack.length <= 1 ? 0 : actionStack.length) - 1;

  console.log(cmd);

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
      {type && type !== "action" && <span className={styles.itemType}>{type}</span>}
      {cmd && <Command cmd={cmd} />}
      
      {/* // TODO: implement new features like custom actions */} 
      
    </li>
  );
}

export default CMDKItem;
