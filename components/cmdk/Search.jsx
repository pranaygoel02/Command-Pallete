"use client";
import { useCMDK } from "context/cmdk.context.jsx";

function Search({styles}) {

    const { showCommandPalette, toggleCommandPalette } = useCMDK();

  return (
    <div onClick={toggleCommandPalette} className={`${styles.box} ${styles.searchbox}`}>
      Search...
      <span className={`${styles.box} ${styles.cmdk}`}>Ctrl + K</span>
    </div>
  );
}

export default Search;
