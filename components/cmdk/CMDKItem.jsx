import { useCMDK } from "@/context/cmdk2.context";
import styles from "./CMDK.module.css";
import Command from "./Command";
import { ICON_MAP } from "@/lib/cmdkData";
import { keys } from "@/lib/keys";

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
  const { selectedItem, handleSelection, actionStack } = useCMDK();
  
  const isSelected = selectedItem === id;
  level = stack?.length - (actionStack.length <= 1 ? 0 : actionStack.length) - 1;
  const hasCmd = cmd?.key?.split("+").length > 0;

  return (
    <li
      title={title}
      onClick={handleSelection}
      id={id}
      data-url={url}
      className={`
        ${styles.item} 
        ${isSelected ? styles.itemSelected : null} 
        ${ level > 1 ? styles.itemChild : null} 
        ${ (type === null && level < 1) ? styles.groupTitle : null}
        ${ hasCmd ? styles.hasCmd : null }
      `}
    >
      {level > 1 && (
        <div className={styles.lines}>
          {Array.from({ length: level - 1 }).map((_, i) => (
            <span key={i} className={styles.line}></span>
          ))}
        </div>
      )}
      {ICON_MAP[icon]}
      <span
        className={styles.itemTitle}
        dangerouslySetInnerHTML={{
          __html: matchResult || title,
        }}
      ></span>
      {type && type !== "action" && (
        <span className={styles.itemType}>{type}</span>
      )}
      {cmd && (
        <div className="inline-flex">
          {cmd?.key?.split("+").map((key, i) => (
            <Command key={i} cmd={{ icon: keys[key], key }} />
          ))}
        </div>
      )}
      {/* // TODO: implement new features like custom actions */}
    </li>
  );
}

export default CMDKItem;
