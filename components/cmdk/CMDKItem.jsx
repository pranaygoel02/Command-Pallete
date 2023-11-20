import { useCMDK } from "@/context/cmdk.context";
import styles from "./CMDK.module.css";

function CMDKItem({ title, url, index }) {

  const {selectedItem} = useCMDK();

  const isSelected = selectedItem === index;

  return (
    <li
      title={title}
      id={index}
      data-url={url}
      className={`${styles.item} ${isSelected ? styles.itemSelected : null}`}
    >
      {title}
    </li>
  );
}

export default CMDKItem;
