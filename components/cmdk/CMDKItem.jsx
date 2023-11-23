import { useCMDK } from "@/context/cmdk.context";
import styles from "./CMDK.module.css";
import fuzzy_match from "@/lib/fuzzy";

function CMDKItem({ title, url, index, type, icon, matchResult, id, level }) {
  const { selectedItem, handleSelection, actionStack, searchTerm } = useCMDK();

  // console.log('>>>>>>', actionStack.length, title.length, matchResult?.split(" / ").slice(title.length - actionStack.length - 1));

  const isSelected = selectedItem === id;
  // let level = title?.length - actionStack.length - 1;
  // if(actionStack.length > 0)
  //   level = actionStack.length;

  console.log('LEVEL', level, title, matchResult);
  // console.log('--------------', matchResult?.split(" / ").slice(title.length - level - 1));
  // matchResult = matchResult
  //   ?.split(" / ")
  //   .slice(title.length - level)
  //   .join("");
  // // console.log('>>>>>>', matchResult);
  // if(matchResult === undefined) matchResult = null;
  // else matchResult = fuzzy_match(matchResult, searchTerm);
  // console.log(level,'title >>> ', title, matchResult, type);

  return (
    <li
      title={title}
      onClick={handleSelection}
      id={id}
      data-url={url}
      className={`${styles.item} ${isSelected ? styles.itemSelected : null} ${
        level > 1 ? styles.itemChild : null
      }`}
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
