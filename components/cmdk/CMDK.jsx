"use client";
import { useCMDK } from "context/cmdk.context.jsx";
import Modal from "../modal/Modal";
import styles from "./CMDK.module.css";
import { CgSpinner } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import CMDKList from "./CMDKList";
import Command from "./Command";

function CMDK() {
  const {
    showCommandPalette,
    searching,
    handleSearch,
    filteredData,
    closeCommandPalette,
    handleItemSelection,
    actionStack
  } = useCMDK();

  console.log(actionStack);

  return (
    <Modal show={showCommandPalette} onCloseModal={closeCommandPalette}>
      <div className={styles.cmdkContainer}>
        <div className={styles.searchContainer}>
          {!searching ? (
            <FiSearch />
          ) : (
            <CgSpinner className={searching ? "animate-spin" : ""} />
          )}
          {
            actionStack && actionStack.length > 0 && <span>{actionStack.join(' / ')} /</span>
          }
          <input
            id="cmdk-search"
            onChange={handleSearch}
            autoFocus={true}
            placeholder="Search..."
            autoComplete="off"
            className={styles.cmdkInput}
          />
          <Command onClick={closeCommandPalette} cmd={'ESC'} />
        </div>
        <section
          onMouseMove={handleItemSelection}
          style={{ height: `${Math.max(filteredData.length * 52 + 32, 60)}px` }}
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
