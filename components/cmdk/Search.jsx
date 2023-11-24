"use client";
import { useCMDK } from "context/cmdk2.context.jsx";
import Loader from "../ui/Loader";

function Search({ styles }) {
  const { toggleCommandPalette, filteredData } = useCMDK();

  if (filteredData.length === 0)
    return (
      <div className={`${styles.box} inline-flex`}>
        <Loader loading={filteredData.length === 0} /> Hang on! Getting the CMDK
        ready
      </div>
    );

  return (
    <div
      onClick={toggleCommandPalette}
      className={`${styles.box} ${styles.searchbox}`}
    >
      Search...
      <span className={`${styles.box} ${styles.cmdk}`}>Ctrl + K</span>
    </div>
  );
}

export default Search;
