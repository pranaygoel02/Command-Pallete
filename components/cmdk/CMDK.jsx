"use client";
import { useCMDK } from "context/cmdk.context.jsx";
import Modal from "../modal/Modal";
import styles from "./CMDK.module.css";
import { CgSpinner } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import CMDKList from "./CMDKList";

function CMDK() {
  const {
    showCommandPalette,
    searching,
    handleSearch,
    filteredData,
    closeCommandPalette,
    handleItemSelection
  } = useCMDK();

  return (
    <Modal show={showCommandPalette} onCloseModal={closeCommandPalette}>
      <div className={styles.cmdkContainer}>
        <div className={styles.searchContainer}>
          {!searching ? (
            <FiSearch />
          ) : (
            <CgSpinner className={searching ? "animate-spin" : ""} />
          )}
          <input
            id="cmdk-search"
            onChange={handleSearch}
            autoFocus={true}
            placeholder="Search..."
            className={styles.cmdkInput}
          />
          <span className={styles.esc}>ESC</span>
        </div>
        <section
          onMouseMove={handleItemSelection}
        >
          <CMDKList
            data={filteredData}
            closeCommandPalette={closeCommandPalette}
          />
        </section>
      </div>
    </Modal>
  );
}

export default CMDK;
